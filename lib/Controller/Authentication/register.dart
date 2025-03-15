import 'dart:convert';
import 'package:bigreward/Const/Api.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Const/decoder.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
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
  RxBool balanceloader = false.obs;
  RxInt balance = 0.obs;

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
          print(decodedResponse['u']);
          GetStorage().write('token', decodedResponse['message']);
          GetStorage().write('userid', decodedResponse['u']);
          await FirebaseMessaging.instance.subscribeToTopic('misc');
          postfid();
          Get.snackbar(
            'Done',
            'Registration successful!',
            backgroundColor: Colors.green,
            colorText: AppColors.White,
          );
          Get.offNamed('/home');
          Future.delayed(Duration(seconds: 2), () {
            showBonusDialog();
          });
        }
        if (decodedResponse['status'] == 0) {
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

  getBalance() async {
    Dio dio = Dio();
    try {
      balanceloader(true);
      var response = await dio.post(
        Endpoints.balance,
        options: Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.data['status'] == 1) {
        balance.value = response.data['b'];
        print(
            "Balance ================================================== ${balance.value}");
      } else {
        Get.snackbar(
          'Error',
          response.data['message'],
          backgroundColor: Colors.red,
          colorText: AppColors.White,
        );
      }
    } catch (e) {
      balanceloader(false);
      print(e);
    } finally {
      balanceloader(false);
    }
  }

  void showBonusDialog() {
    showDialog(
      context: Get.context!,
      builder: (context) => Dialog(
        backgroundColor: Colors.transparent,
        child: Container(
          decoration: BoxDecoration(
            gradient: RadialGradient(
              center: Alignment.center,
              radius: 1.2,
              colors: [
                AppColors.Grape,
                AppColors.Eerieblack,
              ],
              stops: [0.3, 1.0],
            ),
            borderRadius: BorderRadius.circular(15),
          ),
          padding: const EdgeInsets.all(16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.card_giftcard, size: 60, color: Colors.white),
              const SizedBox(height: 10),
              Text(
                "Congratulations!",
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                "You've received a special bonus!\nEnjoy your reward.",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Colors.white70),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () {
                      Get.back();
                      getBalance();
                    },
                    child: const Text(
                      'OK',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
