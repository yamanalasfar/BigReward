import 'package:bigreward/Const/Api.dart';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class ActivitiesController extends GetxController {
  RxBool loader = false.obs;
  var activity;
  getactivity() async {
    Dio dio = Dio();
    try {
      loader(true);
      var response = await dio.post(
        Endpoints.history,
        options: Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.statusCode == 200) {
        print(response.data['message']);
        activity = response.data['message'];
      }
    } catch (e) {
      loader(false);
      print(e);
    } finally {
      loader(false);
    }
  }

  @override
  void onInit() {
    // TODO: implement onInit
    super.onInit();
    getactivity();
  }
}
