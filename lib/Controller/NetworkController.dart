import 'dart:async';
import 'dart:io';
import 'package:get/get.dart';
import 'package:connectivity_plus/connectivity_plus.dart';

class NetworkController extends GetxController {
  var isConnected = true.obs; // Observable for connection status

  @override
  void onInit() {
    super.onInit();
    checkInternetOnStartup();
    monitorConnection();
  }

  // Method to check real internet access
  Future<bool> hasInternetAccess() async {
    try {
      final result = await InternetAddress.lookup('google.com');
      return result.isNotEmpty && result.first.rawAddress.isNotEmpty;
    } on SocketException catch (_) {
      return false;
    }
  }

  // Check internet at app startup
  void checkInternetOnStartup() async {
    isConnected.value = await hasInternetAccess();
  }

  // Listen for real-time connection changes
  void monitorConnection() {
    Connectivity()
        .onConnectivityChanged
        .listen((List<ConnectivityResult> results) async {
      if (results.contains(ConnectivityResult.none)) {
        isConnected.value = false;
      } else {
        isConnected.value = await hasInternetAccess();
      }
    });
  }
}
