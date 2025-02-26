import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/HomeController.dart';
import 'package:bigreward/View/Widgets/CustomTextInput.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:share_plus/share_plus.dart';

class Referral extends StatelessWidget {
  const Referral({super.key});

  @override
  Widget build(BuildContext context) {
    HomeController controller = Get.put(HomeController());
    return Scaffold(
      backgroundColor: AppColors.Eerieblack,
      body: Container(
        padding: EdgeInsets.all(20),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Invite friends',
                style: TextStyle(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                ),
              ),
              Text(
                'How it works',
                style: TextStyle(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
              Text(
                'Share your referral link with friends.',
                style: TextStyle(
                  color: AppColors.White,
                  fontSize: 12,
                ),
              ),
              Text(
                'Your friends receive bonus coins for joining using your link.',
                style: TextStyle(
                  color: AppColors.White,
                  fontSize: 12,
                ),
              ),
              Text(
                'Earn 50% lifetime commission on their earnings.',
                style: TextStyle(
                  color: AppColors.White,
                  fontWeight: FontWeight.bold,
                  fontSize: 12,
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Customtextinput(
                label: 'Referral code',
                textEditingController: controller.referral,
                textInputType: TextInputType.multiline,
                obscureText: false,
              ),
              SizedBox(
                height: 20,
              ),
              InkWell(
                onTap: () {
                  Share.share(controller.referral.text);
                },
                child: Container(
                  height: Get.height * 0.06,
                  padding: EdgeInsets.all(5),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12),
                    gradient: LinearGradient(
                      colors: [AppColors.Mauveine, AppColors.Grape],
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                    ),
                  ),
                  child: Center(
                    child: Text(
                      "Share",
                      style: TextStyle(
                        color: AppColors.White,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
