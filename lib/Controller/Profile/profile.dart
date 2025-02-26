import 'dart:io';
import 'package:bigreward/Const/Api.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:dio/dio.dart' as dio;
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:image_picker/image_picker.dart';

class ProfileController extends GetxController {
  var user;
  Rx<File?> avatar = Rx<File?>(null);
  final ImagePicker picker = ImagePicker();
  RxBool loader = false.obs;
  RxBool avatarloader = false.obs;
  RxBool profileloader = false.obs;
  RxBool deleteloader = false.obs;
  TextEditingController email = TextEditingController();
  TextEditingController name = TextEditingController();

  void pickAvatar() async {
    final XFile? pickedavatar = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 200,
      maxHeight: 200,
    );
    if (pickedavatar != null) {
      avatar.value = File(pickedavatar.path);
      print(avatar.value);
    }
  }

  getProfile() async {
    dio.Dio dioInstance = dio.Dio();
    try {
      loader(true);
      var response = await dioInstance.post(
        Endpoints.profile,
        options: dio.Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.statusCode == 200) {
        user = response.data;
        email.text = user['email'];
        name.text = user['name'];
        print(user);
      }
    } catch (e) {
      loader(false);
      print(e);
    } finally {
      loader(false);
    }
  }

  updateProfile() async {
    dio.Dio dioInstance = dio.Dio();
    try {
      profileloader(true);
      var response = await dioInstance.post(
        Endpoints.updateProfile,
        data: {
          'type': '2',
          'name': name.text,
        },
        options: dio.Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.data['status'] == 1) {
        Get.snackbar(
          'Done',
          response.data['message'],
          backgroundColor: Colors.green,
          colorText: AppColors.White,
        );
      } else {
        Get.snackbar(
          'Error',
          response.data['message'],
          backgroundColor: Colors.red,
          colorText: AppColors.White,
        );
      }
    } catch (e) {
      profileloader(false);
      print(e);
    } finally {
      profileloader(false);
    }
  }

  deleteProfile() async {
    dio.Dio dioInstance = dio.Dio();
    try {
      deleteloader(true);
      var response = await dioInstance.post(
        Endpoints.deleteProfile,
        options: dio.Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.data['status'] == 1) {
        Get.snackbar(
          'Done',
          response.data['message'],
          backgroundColor: Colors.green,
          colorText: AppColors.White,
        );
        GetStorage().remove('token');
        Get.offAllNamed('/login');
      } else {
        Get.snackbar(
          'Error',
          response.data['message'],
          backgroundColor: Colors.red,
          colorText: AppColors.White,
        );
      }
    } catch (e) {
      deleteloader(false);
      print(e);
    } finally {
      deleteloader(false);
    }
  }

  updateAvatar() async {
    dio.Dio dioInstance = dio.Dio();
    try {
      avatarloader(true);
      var formData = dio.FormData.fromMap({
        'image': await dio.MultipartFile.fromFile(avatar.value!.path,
            filename: 'avatar.jpg'),
      });

      var response = await dioInstance.post(
        Endpoints.updateAvatar,
        data: formData,
        options: dio.Options(
          headers: {
            'Authorization': GetStorage().read('token'),
            'Content-Type': 'multipart/form-data'
          },
        ),
      );
      print(response.data);
      if (response.data['status'] == 1) {
        Get.snackbar(
          'Done',
          'Avatar Updated',
          backgroundColor: Colors.green,
          colorText: AppColors.White,
        );
        avatar.value = null;
        getProfile();
      } else {
        Get.snackbar(
          'Error',
          response.data['message'],
          backgroundColor: Colors.red,
          colorText: AppColors.White,
        );
      }
    } catch (e) {
      avatarloader(false);
    } finally {
      avatarloader(false);
    }
  }

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();
    getProfile();
  }
}
