import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/Authentication/login.dart';
import 'package:bigreward/Controller/NetworkController.dart';
import 'package:bigreward/View/Widgets/CustomTextInput.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    LoginController controller = Get.put(LoginController());
    NetworkController networkController = Get.put(NetworkController());

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: RadialGradient(
            center: Alignment.center,
            radius: 1.2,
            colors: [
              AppColors.Mauveine,
              AppColors.Grape,
              AppColors.Eerieblack,
            ],
            stops: [0.3, 0.4, 1.0],
          ),
        ),
        padding: EdgeInsets.only(left: 10, right: 10),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            FaIcon(
              FontAwesomeIcons.gamepad,
              size: 100,
              color: AppColors.White,
            ),
            Text(
              'Big Rewards',
              style: TextStyle(
                color: AppColors.White,
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            Customtextinput(
              label: 'Email',
              textEditingController: controller.email,
              textInputType: TextInputType.emailAddress,
              obscureText: false,
              icon: Icon(
                Icons.email,
                color: AppColors.White,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            Obx(
              () => Customtextinput(
                label: 'Password',
                textEditingController: controller.password,
                textInputType: TextInputType.visiblePassword,
                obscureText: controller.obscureText.value,
                icon: InkWell(
                  onTap: () {
                    controller.obscureText.toggle();
                  },
                  child: controller.obscureText.value == false
                      ? Icon(
                          Icons.visibility_off,
                          color: AppColors.White,
                        )
                      : Icon(
                          Icons.visibility,
                          color: AppColors.White,
                        ),
                ),
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            InkWell(
              onTap: () {
                if (networkController.isConnected.value == false) {
                  Get.snackbar(
                    "No Internet",
                    "Check your connection.",
                    snackPosition: SnackPosition.TOP,
                    backgroundColor: Colors.red,
                    colorText: Colors.white,
                    duration: Duration(seconds: 2),
                  );
                }
                controller.login();
              },
              child: Container(
                width: Get.width,
                height: Get.height * 0.06,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: AppColors.Amber,
                ),
                child: Center(
                  child: Obx(
                    () {
                      if (controller.loader.value == true) {
                        return CircularProgressIndicator(
                          color: AppColors.White,
                        );
                      }
                      return Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.login,
                            color: AppColors.White,
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            "Login",
                            style: TextStyle(
                              color: AppColors.White,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            InkWell(
              onTap: () async {
                Get.offNamed('/register');
              },
              child: Container(
                width: Get.width,
                height: Get.height * 0.06,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: AppColors.White,
                ),
                child: Center(
                  child: Obx(
                    () {
                      if (controller.googleloader.value == true) {
                        return CircularProgressIndicator(
                          color: AppColors.White,
                        );
                      }
                      return Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          FaIcon(
                            FontAwesomeIcons.registered,
                            color: AppColors.Eerieblack,
                          ),
                          SizedBox(
                            width: 5,
                          ),
                          Text(
                            "Register",
                            style: TextStyle(
                              color: AppColors.Eerieblack,
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            // InkWell(
            //   onTap: () {
            //     Get.offNamed('/register');
            //   },
            //   child: Text(
            //     "Need to jois us? register",
            //     style: TextStyle(
            //       color: AppColors.White,
            //       fontSize: 16,
            //       fontWeight: FontWeight.bold,
            //     ),
            //   ),
            // ),
            // const SizedBox(
            //   height: 10,
            // ),
            InkWell(
              onTap: () {
                showDialog(
                  context: context,
                  builder: (context) => Dialog(
                    backgroundColor: Colors.transparent,
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: RadialGradient(
                          center: Alignment.center,
                          radius: 1.2,
                          colors: [
                            AppColors.Grape,
                            AppColors.Eerieblack,
                          ],
                          stops: [0.3, 1.0],
                        ),
                        borderRadius: BorderRadius.circular(15),
                      ),
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Reset Password',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(height: 10),
                          Customtextinput(
                            label: 'Email',
                            textEditingController: controller.reset,
                            textInputType: TextInputType.emailAddress,
                            obscureText: false,
                          ),
                          const SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              TextButton(
                                onPressed: () {
                                  controller.resetPassword();
                                  Get.back();
                                },
                                child: const Text(
                                  'Send',
                                  style: TextStyle(color: Colors.white),
                                ),
                              ),
                              TextButton(
                                onPressed: () => Get.back(),
                                child: const Text(
                                  'Cancel',
                                  style: TextStyle(color: Colors.white),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
              child: Text(
                "Forget Password",
                style: TextStyle(
                  color: AppColors.White,
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
