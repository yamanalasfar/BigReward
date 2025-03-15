import 'dart:convert';

import 'package:bigreward/Const/Api.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Const/decoder.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginController extends GetxController {
  DeviceInfoPlugin deviceInfo = DeviceInfoPlugin();
  TextEditingController email =
      TextEditingController(text: 'husam12345ahmed@gmail.com');
  TextEditingController reset = TextEditingController();
  TextEditingController password = TextEditingController(text: 'hossin1998');
  RxBool obscureText = true.obs;
  RxBool loader = false.obs;
  RxBool googleloader = false.obs;
  String did = '';
  GoogleSignIn googleSignIn = GoogleSignIn(
    scopes: ['email'],
  );
  final FirebaseAuth firebaseAuth = FirebaseAuth.instance;

  User? getCurretntUser() {
    return firebaseAuth.currentUser;
  }

  Future<UserCredential> signinwithemailandpassword(
      String email, String password) async {
    try {
      UserCredential userCredential =
          await firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
      return userCredential;
    } on FirebaseAuthException catch (e) {
      throw Exception(e.code);
    }
  }

  signinwithgoogle() async {
    final GoogleSignInAccount? guser = await GoogleSignIn().signIn();
    final GoogleSignInAuthentication gauth = await guser!.authentication;
    final credential = GoogleAuthProvider.credential(
      accessToken: gauth.accessToken,
      idToken: gauth.idToken,
    );
    return await firebaseAuth.signInWithCredential(credential);
  }

  Future<void> sendTokenToBackend(String idToken) async {
    AndroidDeviceInfo androidInfo = await deviceInfo.androidInfo;
    Dio dio = Dio();
    try {
      googleloader(true);
      var response = await dio.post(
        Endpoints.glogin,
        data: {
          'did': androidInfo.id,
          't': idToken,
        },
        options: Options(
          headers: {
            'Accept': 'application/json',
          },
        ),
      );
      print(response.data);
    } catch (e) {
      googleloader(false);
      print(e);
    } finally {
      googleloader(false);
    }
  }

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

  Future<void> login() async {
    await encryptDeviceId();
    Dio dio = Dio();
    try {
      loader(true);
      var response = await dio.post(
        Endpoints.login,
        data: {
          'did': did,
          'email': email.text,
          'password': password.text,
        },
        options: Options(
          headers: {
            'Accept': 'application/json',
          },
        ),
      );
      var responseBody = DataDeCryp.dec(response.data['data']);
      var decodedResponse = jsonDecode(responseBody);
      if (response.statusCode == 200 || response.statusCode == 201) {
        if (decodedResponse['status'] == 1) {
          GetStorage().write('token', decodedResponse['message']);
          GetStorage().write('userid', decodedResponse['u']);
          await FirebaseMessaging.instance.subscribeToTopic('misc');
          postfid();
          Get.snackbar(
            'Done',
            'Welcome back!',
            backgroundColor: Colors.green,
            colorText: AppColors.White,
          );
          Get.offNamed('/home');
        } else {
          Get.snackbar(
            'Error',
            decodedResponse['message'],
            backgroundColor: Colors.red,
            colorText: AppColors.White,
          );
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

  void resetPassword() async {
    final dio = Dio();

    try {
      final response = await dio.post(
        Endpoints.resetPassword,
        data: {
          'd': reset.text,
        },
        options: Options(
          headers: {
            'Accept': 'application/json',
          },
        ),
      );

      if (response.data['status'] == 1) {
        Get.snackbar(
          'Email sent successfully',
          response.data['message'],
          backgroundColor: Colors.green,
          colorText: AppColors.White,
        );
      } else {
        Get.snackbar(
          'Failed to send email',
          response.data['message'],
          backgroundColor: Colors.red,
          colorText: AppColors.White,
        );
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  postfid() async {
    final fcmToken = await FirebaseMessaging.instance.getToken();
    var headers = {
      'Authorization': '${GetStorage().read('token')}',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    var data = json
        .encode({"f": "$fcmToken", "userid": "${GetStorage().read('userid')}"});
    var dio = Dio();
    var response = await dio.request(
      Endpoints.fid,
      options: Options(
        method: 'POST',
        headers: headers,
      ),
      data: data,
    );

    if (response.statusCode == 200) {
      print(json.encode(response.data));
    } else {
      print(response.statusMessage);
    }
  }
}
