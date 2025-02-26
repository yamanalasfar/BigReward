import 'dart:convert';
import 'package:adjoe/adjoe.dart';
import 'package:adjoe/options.dart';
import 'package:bigreward/Const/Api.dart';
import 'package:bigreward/Const/decoder.dart';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:flutter_tapjoy/flutter_tapjoy.dart';

class OffersController extends GetxController {
  RxBool loader = false.obs;
  var sdkoffers;
  var adjoeoffer;
  var sdkhash;
  var filteredSdkOffers;
  var weboffers;
  var placement;
  var balance = "".obs;
  var connectionState = "".obs;
  var contentStateText = "".obs;

  final TJPlacement myPlacement = TJPlacement(name: "pirate game");
  final TJPlacement myPlacement2 = TJPlacement(name: "pirate game");

  // print(data[0]['value']);
  AdjoeOptions options = new AdjoeOptions()
    ..userId = GetStorage().read('userid');
  void initializeAdjoe(var sdk) {
    Adjoe.init(sdk, options).then((_) {
      print('Init finished successfully');
    }, onError: (err) {
      print('Init failed: $err');
    });
  }

  void initializeTapjoy() {
    TapJoyPlugin.shared.setConnectionResultHandler(_connectionResultHandler);
    TapJoyPlugin.shared.connect(
      androidApiKey:
          "_RBPtZFuT7ajtwtqxqOY_AECrzsGnpzOWZcjUeBNeOoVOIejOctcFxdDwVeV",
      iOSApiKey: "_RBPtZFuT7ajtwtqxqOY_AECrzsGnpzOWZcjUeBNeOoVOIejOctcFxdDwVeV",
      debug: true,
    );

    TapJoyPlugin.shared.setUserID(userID: GetStorage().read('userid'));

    myPlacement.setHandler(_placementHandler);
    myPlacement2.setHandler(_placementHandler);

    TapJoyPlugin.shared.addPlacement(myPlacement);
    TapJoyPlugin.shared.addPlacement(myPlacement2);

    TapJoyPlugin.shared.setGetCurrencyBalanceHandler(_currencyHandler);
    TapJoyPlugin.shared.setAwardCurrencyHandler(_currencyHandler);
    TapJoyPlugin.shared.setSpendCurrencyHandler(_currencyHandler);
    TapJoyPlugin.shared.setEarnedCurrencyAlertHandler(_currencyHandler);
  }

  void _currencyHandler(String? currencyName, int? amount, String? error) {
    balance.value = "Currency: $currencyName | Amount: $amount | Error: $error";
  }

  void _connectionResultHandler(TJConnectionResult result) {
    connectionState.value =
        result == TJConnectionResult.connected ? "Connected" : "Disconnected";
  }

  void _placementHandler(
      TJContentState contentState, String? name, String? error) {
    switch (contentState) {
      case TJContentState.contentReady:
        contentStateText.value = "Content Ready for $name";
        break;
      case TJContentState.contentDidAppear:
        contentStateText.value = "Content Appeared for $name";
        break;
      case TJContentState.contentDidDisappear:
        contentStateText.value = "Content Disappeared for $name";
        break;
      case TJContentState.contentRequestSuccess:
        contentStateText.value = "Content Request Success for $name";
        break;
      case TJContentState.contentRequestFail:
        contentStateText.value = "Request Failed for $name | Error: $error";
        break;
      case TJContentState.userClickedAndroidOnly:
        contentStateText.value = "User Clicked Content for $name";
        break;
    }
  }

  void requestContent(int placementIndex) {
    if (placementIndex == 1) {
      myPlacement.requestContent();
    } else {
      myPlacement2.requestContent();
    }
  }

  void showPlacement(int placementIndex) {
    if (placementIndex == 1) {
      myPlacement.showPlacement();
    } else {
      myPlacement2.showPlacement();
    }
  }

  void getCurrencyBalance() {
    TapJoyPlugin.shared.getCurrencyBalance();
  }

  void awardCurrency(int amount) {
    TapJoyPlugin.shared.awardCurrency(amount);
  }

  void spendCurrency(int amount) {
    TapJoyPlugin.shared.spendCurrency(amount);
  }

  Future<void> LaunchUrl(var url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw Exception('Could not launch $url');
    }
  }

  Future<void> getOffers() async {
    Dio dio = Dio();
    try {
      loader(true);
      var response = await dio.post(
        Endpoints.offers,
        options: Options(
          headers: {'Authorization': 'Bearer ${GetStorage().read('token')}'},
        ),
      );
      var responseBody = DataDeCryp.dec(response.data['data']);
      var decodedResponse = jsonDecode(responseBody);
      if (response.statusCode == 200) {
        sdkoffers = decodedResponse['offers']['offerwall_sdk'];
        weboffers = decodedResponse['offers']['offerwall_web'];
        adjoeoffer = sdkoffers.firstWhere(
          (offer) => offer['name'] == 'adjoe',
          orElse: () => null, // Returns null if not found
        );
        sdkhash = jsonDecode(adjoeoffer['data']);
        filteredSdkOffers =
            sdkoffers.where((offer) => offer['name'] != 'adjoe').toList();
      }
    } catch (e) {
      print(e);
    } finally {
      loader(false);
    }
  }

  @override
  void onInit() async {
    super.onInit();
    await getOffers();
    initializeAdjoe(sdkhash[0]['value']);
    initializeTapjoy();
  }
}
