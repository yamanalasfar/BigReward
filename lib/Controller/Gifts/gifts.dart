import 'package:bigreward/Const/Api.dart';
import 'package:dio/dio.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class GiftsController extends GetxController {
  RxBool loader = false.obs;
  var gifts;
  getgifts() async {
    Dio dio = Dio();
    try {
      loader(true);
      var response = await dio.post(
        Endpoints.gifts,
        options: Options(
          headers: {
            'Authorization': GetStorage().read('token'),
          },
        ),
      );
      if (response.statusCode == 200) {
        gifts = response.data['cat'];
        print(gifts);
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
    getgifts();
  }
}
