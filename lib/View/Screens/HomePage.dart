import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/HomeController.dart';
import 'package:bigreward/View/Screens/Acivity/activities.dart';
import 'package:bigreward/View/Screens/Gift/gifts.dart';
import 'package:bigreward/View/Screens/Offer/offers.dart';
import 'package:bigreward/View/Screens/Referral/referral.dart';
import 'package:bottom_bar_matu/bottom_bar/bottom_bar_bubble.dart';
import 'package:bottom_bar_matu/bottom_bar_item.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

class Homepage extends StatefulWidget {
  @override
  _HomepageState createState() => _HomepageState();
}

class _HomepageState extends State<Homepage> {
  final HomeController controller = Get.put(HomeController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.Eerieblack,
        elevation: 0,
        actions: [
          Obx(
            () => InkWell(
              onTap: () {
                controller.getBalance();
              },
              child: Text(
                "${controller.balance.value} 💰",
                style: TextStyle(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
            ),
          ),
        ],
        leading: Obx(
          () => Padding(
            padding: EdgeInsets.all(10),
            child: InkWell(
              onTap: () {
                Get.toNamed('/profile');
              },
              child: CircleAvatar(
                backgroundImage: controller.loader.value != false
                    ? AssetImage('assets/images/avatar-3814049_640.png')
                    : controller.user['avatar'] == null
                        ? AssetImage('assets/images/avatar-3814049_640.png')
                        : NetworkImage(controller.user['avatar']),
              ),
            ),
          ),
        ),
        title: Obx(
          () {
            if (controller.selectedIndex.value == 0) {
              return Text(
                'Big Rewards',
                style: GoogleFonts.lobster(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              );
            }
            if (controller.selectedIndex.value == 1) {
              return Text(
                'Gifts',
                style: GoogleFonts.lobster(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              );
            }
            if (controller.selectedIndex.value == 2) {
              return Text(
                'Referral',
                style: GoogleFonts.lobster(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              );
            } else {
              return Text(
                'Activities',
                style: GoogleFonts.lobster(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              );
            }
          },
        ),
        centerTitle: true,
      ),
      body: Obx(() {
        switch (controller.selectedIndex.value) {
          case 0:
            return OffersScreen();
          case 1:
            return Gifts();
          case 2:
            return Referral();
          case 3:
            return Activities();
          default:
            return OffersScreen();
        }
      }),
      bottomNavigationBar: BottomBarBubble(
        backgroundColor: AppColors.Amber,
        color: AppColors.Eerieblack,
        selectedIndex: controller.selectedIndex.value,
        items: [
          BottomBarItem(iconData: Icons.home, label: "Offers"),
          BottomBarItem(iconData: Icons.card_giftcard_sharp, label: "Gifts"),
          BottomBarItem(iconData: Icons.share, label: "Referral"),
          BottomBarItem(iconData: Icons.local_activity, label: "Activity"),
        ],
        onSelect: (index) {
          controller.selectedIndex.value = index;
        },
      ),
    );
  }
}
