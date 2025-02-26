import 'package:bigreward/Const/Colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:url_launcher/url_launcher.dart';

class Policyscreen extends StatelessWidget {
  const Policyscreen({super.key});

  Future<void> LaunchUrl(var url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw Exception('Could not launch $url');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.Eerieblack,
      appBar: AppBar(
        title: Text(
          'Terms of Service',
          style: TextStyle(color: AppColors.White),
        ),
        backgroundColor: AppColors.Eerieblack,
        elevation: 0,
        centerTitle: true,
        leading: null,
      ),
      bottomNavigationBar: BottomSheet(
        onClosing: () {},
        backgroundColor: AppColors.Eerieblack,
        shadowColor: AppColors.Grape,
        builder: (context) {
          return Padding(
            padding: EdgeInsets.all(10),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'I here by agree that Bigreward App uses he following:',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppColors.White,
                    fontSize: 12,
                  ),
                ),
                Text(
                  '- Personal data in the context if the use of Bigreward App:',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppColors.White,
                    fontSize: 12,
                  ),
                ),
                Text(
                  'Registeration data (email)',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppColors.White,
                    fontSize: 12,
                  ),
                ),
                Text(
                  '- Installed Apps (includes the use duration and use history)',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: AppColors.White,
                    fontSize: 12,
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    TextButton(
                      onPressed: () {
                        LaunchUrl('https://joycash.click/privacy');
                      },
                      child: Text(
                        'Privacy policy',
                        style: TextStyle(
                          color: AppColors.White,
                          decoration: TextDecoration.underline,
                          decorationColor: AppColors.White,
                        ),
                      ),
                    ),
                    TextButton(
                      onPressed: () {
                        LaunchUrl('https://joycash.click/terms');
                      },
                      child: Text(
                        'Terms & conditions',
                        style: TextStyle(
                          color: AppColors.White,
                          decoration: TextDecoration.underline,
                          decorationColor: AppColors.White,
                        ),
                      ),
                    ),
                  ],
                ),
                InkWell(
                  onTap: () {
                    Get.offNamed('/login');
                    GetStorage().write('terms', 'accept');
                  },
                  child: Container(
                    width: Get.width,
                    height: Get.height * 0.06,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(12),
                      gradient: LinearGradient(
                        colors: [AppColors.Grape, AppColors.Mauveine],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ),
                    ),
                    child: Center(
                      child: Text(
                        "Accept",
                        style: TextStyle(
                          color: AppColors.White,
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Row(
                  children: [
                    Expanded(
                      child: Divider(color: AppColors.White, thickness: 1),
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 8),
                      child: Text(
                        'OR',
                        style: TextStyle(
                          color: AppColors.White,
                          fontSize: 12,
                        ),
                      ),
                    ),
                    Expanded(
                      child: Divider(color: AppColors.White, thickness: 1),
                    ),
                  ],
                ),
                Center(
                  child: TextButton(
                    onPressed: () {
                      SystemNavigator.pop();
                    },
                    child: Text(
                      'Reject',
                      style: TextStyle(
                        color: AppColors.White,
                        decoration: TextDecoration.underline,
                        decorationColor: AppColors.White,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
      body: SingleChildScrollView(
        physics: BouncingScrollPhysics(parent: AlwaysScrollableScrollPhysics()),
        child: Container(
          margin: EdgeInsets.all(10),
          child: Column(
            children: [
              RichText(
                text: TextSpan(
                  children: [
                    TextSpan(
                      text: 'Declaration of AAID Use:\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text: 'Why is the Advertising ID declaration Important? ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          'The Advertising ID (AAID) is a unique identifier that Google assigns to each android device. it is used by advertisers to track users across different apps and devices and to serve more targeted ads.\n\n',
                      style: TextStyle(
                        height: 1.5,
                        fontSize: 12,
                        color: AppColors.White,
                      ),
                    ),
                    TextSpan(
                      text: 'Advertising Use: ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          'Our app and our partners will never connect your advertising identifiers (AAID) to persistent device identifiers.\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text:
                          'Our app will connect your advertising identifier (AAID) to personally identifiable for fraud detecion only after explicit consent of you in the',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: ' next dialog box.\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text: 'Analytics Use:',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          ' our app and our partners will never connect to presonally identifiable information or associated with any persistent device identifier for any ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'analytics purpose.\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text: 'AAID Reset: ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          'for fraud detecion purpose, if you reset your adverising identifier (AAID) our app will connect your new adverising identifier or data derived to your previous adverising identifier only after your explicit consent in the ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'next dialog box.\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text: 'AAID Delete: ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          'if you delete you advertising identifier (AAID) our app and our partners will never connect or use your previous advertising identifier ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'for any purpose.\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text: 'Opting Out: ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          'if you opt out of interest-based advertising or presonalized advertising, your advertising identifier (AAID) will no longer be used for and advertising purposes. its ise will be restricted to contextual advertising, Appear limitaion, conversion tracking, reportiong, and safety and fraud detecion.\n\n',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'in the ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                    TextSpan(
                      text: 'next dialog box, ',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextSpan(
                      text:
                          'you can customize your preference settings and you can back to change it any time.',
                      style: TextStyle(
                        fontSize: 12,
                        color: AppColors.White,
                        height: 1.5,
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
