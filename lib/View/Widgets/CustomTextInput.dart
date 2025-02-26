import 'package:bigreward/Const/Colors.dart';
import 'package:flutter/material.dart';

class Customtextinput extends StatelessWidget {
  String label;
  TextEditingController textEditingController;
  TextInputType textInputType;
  bool obscureText;
  Widget? icon;

  Customtextinput({
    super.key,
    required this.label,
    required this.textEditingController,
    required this.textInputType,
    required this.obscureText,
    this.icon,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      style: TextStyle(color: AppColors.White),
      controller: textEditingController,
      cursorColor: AppColors.White,
      keyboardType: textInputType,
      obscureText: obscureText,
      decoration: InputDecoration(
        labelText: label,
        suffixIcon: icon,
        labelStyle: TextStyle(color: AppColors.White),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.White,
            width: 1,
          ),
        ),
        disabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.White,
            width: 1,
          ),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.White,
            width: 1,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(
            color: AppColors.White,
            width: 1,
          ),
        ),
      ),
    );
  }
}
