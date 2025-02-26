import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/Authentication/register.dart';
import 'package:bigreward/Controller/NetworkController.dart';
import 'package:bigreward/View/Widgets/CustomTextInput.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    RegisterController controller = Get.put(RegisterController());
    NetworkController networkController = Get.put(NetworkController());

    return Scaffold(
      //backgroundColor: AppColors.Eerieblack,
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
              label: 'Name',
              textEditingController: controller.name,
              textInputType: TextInputType.name,
              obscureText: false,
              icon: Icon(
                Icons.person,
                color: AppColors.White,
              ),
            ),
            const SizedBox(
              height: 10,
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
                  child: controller.obscureText.value == true
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
                controller.register();
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
                            "Register",
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
              onTap: () {
                Get.offNamed('/login');
              },
              child: Text(
                "Have an account? login",
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
