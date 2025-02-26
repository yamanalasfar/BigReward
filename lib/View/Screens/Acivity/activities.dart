import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/Activity/activities.dart';
import 'package:bigreward/Controller/NetworkController.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Activities extends StatelessWidget {
  const Activities({super.key});

  @override
  Widget build(BuildContext context) {
    ActivitiesController controller = Get.put(ActivitiesController());
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
                  if (controller.activity == null ||
                      controller.activity.isEmpty) {
                    return Center(
                      child: Text(
                        'No activities available',
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
                      await controller.getactivity();
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
                          child: Row(
                            children: [
                              Expanded(
                                child: ListTile(
                                  leading: Text(
                                    controller.activity[index]['type'],
                                    style: TextStyle(
                                      color: AppColors.Amber,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 12,
                                    ),
                                  ),
                                  title: Text(
                                    controller.activity[index]['type'] ==
                                            'redeem'
                                        ? controller.activity[index]['g_name']
                                        : controller.activity[index]['network'],
                                    style: TextStyle(
                                      color: AppColors.White,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 14,
                                    ),
                                  ),
                                  trailing: controller.activity[index]
                                              ['type'] ==
                                          'activity'
                                      ? Text(
                                          controller.activity[index]['points'],
                                          style: TextStyle(
                                            color: AppColors.White,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 14,
                                          ),
                                        )
                                      : null,
                                ),
                              ),
                              if (controller.activity[index]['type'] ==
                                  'redeem')
                                controller.activity[index]['is_completed'] ==
                                        '0'
                                    ? Text(
                                        'Pending',
                                        style:
                                            TextStyle(color: AppColors.Amber),
                                      )
                                    : Text(
                                        'Completed',
                                        style: TextStyle(color: Colors.green),
                                      )
                            ],
                          ),
                        );
                      },
                      separatorBuilder: (context, index) {
                        return SizedBox(
                          height: 10,
                        );
                      },
                      itemCount: controller.activity.length,
                    ),
                  );
                },
              );
            }
          },
        ));
  }
}
