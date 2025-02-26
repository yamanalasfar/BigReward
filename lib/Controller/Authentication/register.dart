import 'dart:convert';
import 'package:bigreward/Const/Api.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Const/decoder.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:dio/dio.dart';

class RegisterController extends GetxController {
  DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  TextEditingController email = TextEditingController();
  TextEditingController name = TextEditingController();
  TextEditingController password = TextEditingController();
  RxBool obscureText = true.obs;
  RxBool loader = false.obs;
  String did = '';

  Future<void> encryptDeviceId() async {
    DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
    AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;

    String deviceId = androidInfo.id;
    String key = "yamanalasfar"; // Manually typed key

    print(deviceId);
    // Encrypt
    String encryptedId = xorEncrypt(deviceId, key);
    print("Encrypted ID: $encryptedId");
    did = encryptedId;

    // Decrypt
    String decryptedId = xorDecrypt(encryptedId, key);
    print("Decrypted ID: $decryptedId");
  }

  String xorEncrypt(String input, String key) {
    List<int> inputBytes = utf8.encode(input);
    List<int> keyBytes = utf8.encode(key);
    List<int> encryptedBytes = [];

    for (int i = 0; i < inputBytes.length; i++) {
      encryptedBytes.add(inputBytes[i] ^ keyBytes[i % keyBytes.length]);
    }

    return base64Url.encode(encryptedBytes); // Use base64Url for safe encoding
  }

  String xorDecrypt(String input, String key) {
    List<int> encryptedBytes = base64Url.decode(input); // Decode base64
    List<int> keyBytes = utf8.encode(key);
    List<int> decryptedBytes = [];

    for (int i = 0; i < encryptedBytes.length; i++) {
      decryptedBytes.add(encryptedBytes[i] ^ keyBytes[i % keyBytes.length]);
    }

    return utf8.decode(decryptedBytes); // Decode to original string
  }

  Future<void> register() async {
    await encryptDeviceId();
    Dio dio = Dio();
    try {
      loader(true);
      var response = await dio.post(
        Endpoints.register,
        data: {
          'did': did,
          'email': email.text,
          'name': name.text,
          'password': password.text,
          'password_confirmation': password.text,
          'rb': 'none'
        },
        options: Options(
          headers: {
            'Accept': 'application/json',
          },
        ),
      );
      var responseBody = DataDeCryp.dec(response.data['data']);
      var decodedResponse = jsonDecode(responseBody);
      print(decodedResponse);
      print(response.statusCode);
      if (response.statusCode == 200 || response.statusCode == 201) {
        if (decodedResponse['status'] == 1) {
          GetStorage().write('token', decodedResponse['message']);
          Get.snackbar(
            'Done',
            'Registration successful!',
            backgroundColor: Colors.green,
            colorText: AppColors.White,
          );
          Get.offNamed('/home');
        }
        if (decodedResponse['status'] == -2) {
          //GetStorage().write('token', decodedResponse['message']);
          Get.snackbar(
            'Done',
            decodedResponse['message'],
            backgroundColor: AppColors.Amber,
            colorText: AppColors.White,
          );
          // Get.offNamed('/home');
        }
      } else {
        Get.snackbar(
          'Error',
          decodedResponse['message'],
          backgroundColor: Colors.red,
          colorText: Colors.white,
        );
      }
    } catch (e) {
      loader(false);
      print(e);
    } finally {
      loader(false);
    }
  }
}
