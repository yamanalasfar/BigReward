import 'package:bigreward/View/PolicyScreen.dart';
import 'package:bigreward/View/Screens/Authentication/login.dart';
import 'package:bigreward/View/Screens/Authentication/register.dart';
import 'package:bigreward/View/Screens/HomePage.dart';
import 'package:bigreward/View/Screens/Profile/profile.dart';
import 'package:bigreward/View/Screens/Referral/referral.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  await GetStorage.init();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: GetStorage().read('terms') != 'accept'
          ? '/'
          : GetStorage().read('token') == null
              ? '/login'
              : '/home',
      getPages: [
        GetPage(
          name: '/register',
          page: () => const RegisterScreen(),
        ),
        GetPage(
          name: '/login',
          page: () => const LoginScreen(),
        ),
        GetPage(
          name: '/home',
          page: () => Homepage(),
        ),
        GetPage(
          name: '/profile',
          page: () => Profile(),
        ),
        GetPage(
          name: '/referral',
          page: () => Referral(),
        ),
        GetPage(
          name: '/',
          page: () => Policyscreen(),
        ),
      ],
    );
  }
}
