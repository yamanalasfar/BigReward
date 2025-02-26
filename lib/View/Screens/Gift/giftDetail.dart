import 'package:bigreward/Controller/HomeController.dart';
import 'package:bigreward/View/Widgets/CustomTextInput.dart';
import 'package:flutter/material.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:get/get.dart';

class GiftDetail extends StatelessWidget {
  final String tag;
  final String imagePath;
  var items;

  GiftDetail(
      {super.key,
      required this.tag,
      required this.imagePath,
      required this.items});

  @override
  Widget build(BuildContext context) {
    HomeController controller = Get.put(HomeController());
    return Scaffold(
      backgroundColor: AppColors.Eerieblack,
      appBar: AppBar(
        leading: InkWell(
          onTap: () {
            Get.back();
          },
          child: Icon(
            Icons.arrow_back,
            color: AppColors.White,
          ),
        ),
        backgroundColor: AppColors.Eerieblack,
        elevation: 0,
        title: Hero(
          tag: tag,
          child: Image.network(
            imagePath,
            height: 50,
          ),
        ),
        centerTitle: true,
      ),
      body: Padding(
        padding: EdgeInsets.all(10),
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
              child: ListTile(
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
                              'Redeem',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 10),
                            Customtextinput(
                              label: 'Email',
                              textEditingController: controller.email,
                              textInputType: TextInputType.emailAddress,
                              obscureText: false,
                            ),
                            const SizedBox(height: 20),
                            Row(
                              mainAxisAlignment: MainAxisAlignment.end,
                              children: [
                                TextButton(
                                  onPressed: () {
                                    controller.redeem(items[index]['id']);
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
                leading: Image.network(
                  imagePath,
                  fit: BoxFit.fill,
                ),
                title: Text(
                  "Points: ${items[index]['points']}",
                  style: TextStyle(color: AppColors.White),
                ),
                subtitle: Text(
                  "Quantity: ${items[index]['quantity']}",
                  style: TextStyle(color: AppColors.White.withOpacity(0.5)),
                ),
                trailing: Text(
                  items[index]['amount'],
                  style: TextStyle(
                    color: AppColors.White,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ),
            );
          },
          separatorBuilder: (context, index) {
            return const SizedBox(
              height: 10,
            );
          },
          itemCount: items.length,
        ),
      ),
    );
  }
}
