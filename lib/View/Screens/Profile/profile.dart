import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/NetworkController.dart';
import 'package:bigreward/Controller/Profile/profile.dart';
import 'package:bigreward/View/Widgets/CustomTextInput.dart';
import 'package:get/get.dart';
import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';

class Profile extends StatelessWidget {
  const Profile({super.key});

  @override
  Widget build(BuildContext context) {
    ProfileController controller = Get.put(ProfileController());
    NetworkController networkController = Get.put(NetworkController());
    return Scaffold(
      backgroundColor: AppColors.Eerieblack,
      appBar: AppBar(
        title: Text(
          'Profile',
          style: TextStyle(color: AppColors.White),
        ),
        centerTitle: true,
        backgroundColor: AppColors.Eerieblack,
        leading: InkWell(
          onTap: () {
            Get.offNamed('/home');
          },
          child: Icon(
            Icons.arrow_back,
            color: AppColors.White,
          ),
        ),
        elevation: 0,
      ),
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
                return SingleChildScrollView(
                  physics: BouncingScrollPhysics(
                    parent: AlwaysScrollableScrollPhysics(),
                  ),
                  child: Column(
                    children: [
                      Center(
                        child: InkWell(
                          onTap: () {
                            controller.pickAvatar();
                          },
                          child: CircleAvatar(
                            radius: 100,
                            backgroundImage: controller.avatar.value != null
                                ? FileImage(controller.avatar.value!)
                                : controller.user['avatar'] != null
                                    ? NetworkImage(controller.user['avatar'])
                                    : AssetImage(
                                        'assets/images/avatar-3814049_640.png'),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Obx(
                        () {
                          if (controller.avatar.value == null) {
                            return Container();
                          }
                          return InkWell(
                            onTap: () {
                              controller.updateAvatar();
                            },
                            child: Container(
                              width: Get.width * 0.5,
                              height: Get.height * 0.06,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                color: AppColors.Amber,
                              ),
                              child: Center(
                                child: Obx(
                                  () {
                                    if (controller.avatarloader.value == true) {
                                      return CircularProgressIndicator(
                                        color: AppColors.White,
                                      );
                                    }
                                    return Text(
                                      "Update avatar",
                                      style: TextStyle(
                                        color: AppColors.White,
                                        fontWeight: FontWeight.bold,
                                        fontSize: 18,
                                      ),
                                    );
                                  },
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                      Container(
                        padding: EdgeInsets.all(10),
                        child: Customtextinput(
                          label: 'Email',
                          textEditingController: controller.email,
                          textInputType: TextInputType.emailAddress,
                          obscureText: false,
                        ),
                      ),
                      Container(
                        padding: EdgeInsets.all(10),
                        child: Customtextinput(
                          label: 'Name',
                          textEditingController: controller.name,
                          textInputType: TextInputType.emailAddress,
                          obscureText: false,
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      InkWell(
                        onTap: () {
                          controller.updateProfile();
                        },
                        child: Container(
                          height: Get.height * 0.08,
                          margin: EdgeInsets.only(left: 10, right: 10),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            color: AppColors.Amber,
                          ),
                          child: Center(
                            child: Obx(
                              () {
                                if (controller.profileloader.value == true) {
                                  return CircularProgressIndicator(
                                    color: AppColors.White,
                                  );
                                }
                                return Text(
                                  "Update profile",
                                  style: TextStyle(
                                    color: AppColors.White,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      InkWell(
                        onTap: () {
                          controller.deleteProfile();
                        },
                        child: Container(
                          height: Get.height * 0.08,
                          margin: EdgeInsets.only(left: 10, right: 10),
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            gradient: LinearGradient(
                              colors: [AppColors.Mauveine, AppColors.Grape],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                          ),
                          child: Center(
                            child: Obx(
                              () {
                                if (controller.deleteloader.value == true) {
                                  return CircularProgressIndicator(
                                    color: AppColors.White,
                                  );
                                }
                                return Text(
                                  "Delete profile",
                                  style: TextStyle(
                                    color: AppColors.White,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      Row(
                        children: [
                          Expanded(
                            child:
                                Divider(color: AppColors.White, thickness: 1),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(horizontal: 8),
                            child: Text(
                              'Logout',
                              style: TextStyle(
                                color: AppColors.White,
                                fontSize: 12,
                              ),
                            ),
                          ),
                          Expanded(
                            child:
                                Divider(color: AppColors.White, thickness: 1),
                          ),
                        ],
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      InkWell(
                        onTap: () {
                          Get.offAllNamed('/login');
                          GetStorage().remove('token');
                        },
                        child: Container(
                          margin: EdgeInsets.only(left: 10, right: 10),
                          width: Get.width,
                          height: Get.height * 0.08,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(12),
                            gradient: LinearGradient(
                              colors: [AppColors.Mauveine, AppColors.Grape],
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                            ),
                          ),
                          child: Center(
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              crossAxisAlignment: CrossAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.logout,
                                  color: AppColors.White,
                                ),
                                SizedBox(
                                  width: 5,
                                ),
                                Text(
                                  "Logout",
                                  style: TextStyle(
                                    color: AppColors.White,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      )
                    ],
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
