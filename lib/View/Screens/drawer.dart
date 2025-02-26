import 'package:bigreward/Controller/HomeController.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:get_storage/get_storage.dart';

class DrawerScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    HomeController controller = Get.put(HomeController());
    return Container(
      color: AppColors.Eerieblack,
      padding: EdgeInsets.only(top: 50, left: 20, bottom: 50),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Profile Section
          Column(
            children: [
              Obx(
                () {
                  if (controller.loader.value == true) {
                    return CircularProgressIndicator(
                      color: AppColors.White,
                    );
                  }
                  return InkWell(
                    onTap: () {
                      Get.toNamed('/profile');
                    },
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 30,
                          backgroundImage: controller.user['avatar'] == null
                              ? AssetImage('images/avatar-3814049_640.png')
                              : NetworkImage(controller.user['avatar']),
                        ),
                        SizedBox(width: 10),
                        Text(
                          controller.user['name'],
                          style: TextStyle(
                            color: AppColors.White,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(
                height: 20,
              ),
              DrawerItem(
                icon: Icons.mobile_screen_share_outlined,
                text: 'Referral',
                onTap: () {
                  Get.toNamed('/referral');
                },
              ),
            ],
          ),

          // Logout Button
          GestureDetector(
            onTap: () {
              GetStorage().remove('token');
              Get.offAllNamed('/login'); // Navigate to login screen
            },
            child: Row(
              children: [
                Icon(Icons.logout, color: Colors.white70),
                SizedBox(width: 10),
                Text(
                  'Logout',
                  style: TextStyle(color: Colors.white70),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// Drawer Item Widget
class DrawerItem extends StatelessWidget {
  final IconData icon;
  final String text;
  final VoidCallback onTap;

  const DrawerItem(
      {required this.icon, required this.text, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: Colors.white),
      title: Text(
        text,
        style: TextStyle(color: Colors.white),
      ),
      onTap: onTap,
    );
  }
}
