import 'dart:async';
import 'package:adjust_sdk/adjust_config.dart';
import 'package:bigreward/Const/Api.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:dio/dio.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:adjust_sdk/adjust.dart';
import 'package:adjust_sdk/adjust_event.dart';

class HomeController extends GetxController {
  var selectedIndex = 0.obs;
  RxBool loader = false.obs;
  RxBool balanceloader = false.obs;
  var user;
  RxInt balance = 0.obs;
  TextEditingController email = TextEditingController();
  TextEditingController referral = TextEditingController(
      text: 'https://bigrewards.pro/j/${GetStorage().read('userid')}');
  var events = <Map<String, String>>[].obs;
  var isLoading = false.obs;
  var adjustKey = ''.obs;
  Timer? _balanceTimer;

  void changeTabIndex(int index) {
    selectedIndex.value = index;
  }

  redeem(var id) async {
    Dio dio = Dio();
    var response = await dio.post(
      Endpoints.redeem,
      data: {
        'acc': email.text,
        'wid': '$id',
        'cc': 'US',
      },
      options: Options(
        headers: {
          'Authorization': GetStorage().read('token'),
        },
      ),
    );
    print(response.statusCode);
    if (response.data['status'] == 1) {
      Get.snackbar(
        'Done',
        response.data['message'],
        backgroundColor: Colors.green,
        colorText: AppColors.White,
      );
      email.clear();
      getBalance();
    } else {
      Get.snackbar(
        'Error',
        response.data['message'],
        backgroundColor: Colors.red,
        colorText: AppColors.White,
      );
      email.clear();
    }
  }

  getProfile() async {
    Dio dio = Dio();
    try {
      loader(true);
      var response = await dio.post(
        Endpoints.profile,
        options: Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.data['status'] == 1) {
        user = response.data;
      } else {
        Get.snackbar(
          'Error',
          response.data['message'],
          backgroundColor: Colors.red,
          colorText: AppColors.White,
        );
      }
    } catch (e) {
      loader(false);
      print(e);
    } finally {
      loader(false);
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
        fetchAdjustEvents();
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

  Future<void> fetchAdjustEvents() async {
    isLoading.value = true;
    Dio dio = Dio();
    try {
      var response = await dio.post(
        Endpoints.adjustkey,
        data: {
          'user': '${GetStorage().read('userid')}',
        },
        options: Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );

      if (response.statusCode == 200 && response.data['status'] == 1) {
        adjustKey.value = response.data['adjust_key'];
        AdjustConfig config =
            new AdjustConfig(adjustKey.value, AdjustEnvironment.sandbox);
        Adjust.initSdk(config);
        for (int i = 0; i < response.data['adjust_events'].length; i++) {
          if (balance.value >=
              int.parse(response.data['adjust_events'][i]['event_value'])) {
            AdjustEvent myAdjustEvent = new AdjustEvent(
                response.data['adjust_events'][i]['event_name']);
            Adjust.trackEvent(myAdjustEvent);
          }
        }
      } else {
        print('Error: ${response.data['message']}');
      }
    } catch (e) {
      print('API Error: $e');
    } finally {
      isLoading.value = false;
    }
  }

  void _startBalanceTimer() {
    _balanceTimer = Timer.periodic(Duration(seconds: 10), (timer) {
      getBalance();
    });
  }

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();
    getProfile();
    getBalance();
    _startBalanceTimer();
  }
}
