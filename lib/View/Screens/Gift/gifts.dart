import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/Gifts/gifts.dart';
import 'package:bigreward/Controller/NetworkController.dart';
import 'package:bigreward/View/Screens/Gift/giftDetail.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Gifts extends StatelessWidget {
  const Gifts({super.key});

  @override
  Widget build(BuildContext context) {
    GiftsController controller = Get.put(GiftsController());
    NetworkController networkController = Get.put(NetworkController());

    return Scaffold(
      backgroundColor: AppColors.Eerieblack,
      body: Obx(
        () {
          if (networkController.isConnected.value == false) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.wifi_off, size: 80, color: AppColors.Grape),
                  SizedBox(height: 10),
                  Text("No Internet Connection",
                      style: TextStyle(
                        fontSize: 18,
                        color: AppColors.White,
                        fontWeight: FontWeight.bold,
                      )),
                ],
              ),
            );
          } else {
            return Obx(
              () {
                if (controller.loader.value == true) {
                  return Center(
                    child: CircularProgressIndicator(
                      color: AppColors.White,
                    ),
                  );
                }
                if (controller.gifts == null || controller.gifts.isEmpty) {
                  return Center(
                    child: Text(
                      'No gifts available',
                      style: TextStyle(
                        color: AppColors.White,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  );
                }
                return RefreshIndicator(
                  onRefresh: () async {
                    await controller.getgifts();
                  },
                  child: ListView.separated(
                    itemBuilder: (context, index) {
                      return Container(
                        padding: const EdgeInsets.all(10),
                        margin: EdgeInsets.only(left: 10, right: 10),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          gradient: LinearGradient(
                            colors: [AppColors.Mauveine, AppColors.Grape],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                        ),
                        child: ListTile(
                          onTap: () {
                            Get.to(() => GiftDetail(
                                  tag: '${controller.gifts[index]['name']}',
                                  imagePath: controller.gifts[index]['image'],
                                  items: controller.gifts[index]['items'],
                                ));
                          },
                          leading: Hero(
                            tag: '${controller.gifts[index]['name']}',
                            child: Image.network(
                              controller.gifts[index]['image'],
                              fit: BoxFit.fill,
                            ),
                          ),
                          title: Text(
                            controller.gifts[index]['name'],
                            style: TextStyle(color: AppColors.White),
                          ),
                          subtitle: Text(
                            "Gift card",
                            style: TextStyle(
                                color: AppColors.White.withOpacity(0.5)),
                          ),
                        ),
                      );
                    },
                    separatorBuilder: (context, index) {
                      return const SizedBox(
                        height: 10,
                      );
                    },
                    itemCount: controller.gifts.length,
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
