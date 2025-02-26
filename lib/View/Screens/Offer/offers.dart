import 'dart:convert';

import 'package:adjoe/adjoe.dart';
import 'package:bigreward/Const/Colors.dart';
import 'package:bigreward/Controller/HomeController.dart';
import 'package:bigreward/Controller/NetworkController.dart';
import 'package:bigreward/Controller/Offers/offers.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class OffersScreen extends StatelessWidget {
  const OffersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    OffersController controller = Get.put(OffersController());
    NetworkController networkController = Get.put(NetworkController());
    HomeController homeController = Get.find();

    return Scaffold(
      backgroundColor: AppColors.Eerieblack,
      body: RefreshIndicator(
        onRefresh: () async {
          await controller.getOffers();
          homeController.onInit();
        },
        child: Obx(
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
                  if (controller.loader.value) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  }

                  if ((controller.filteredSdkOffers?.isEmpty ?? true) &&
                      (controller.weboffers?.isEmpty ?? true) &&
                      controller.adjoeoffer == null) {
                    return const Center(
                      child: Text(
                        'No offers available',
                        style: TextStyle(
                            fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    );
                  }

                  return SingleChildScrollView(
                    physics: const BouncingScrollPhysics(
                        parent: AlwaysScrollableScrollPhysics()),
                    child: Padding(
                      padding: const EdgeInsets.all(10),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Adjoe Offer Section (Highlighted)
                          if (controller.adjoeoffer != null)
                            Container(
                              height: Get.height * 0.3,
                              width: Get.width,
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [AppColors.Mauveine, AppColors.Grape],
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                ),
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Expanded(
                                    flex: 3,
                                    child: Image.asset(
                                      "assets/images/photo_2025-02-27_00-19-53.jpg",
                                      fit: BoxFit.fill,
                                      width: Get.width,
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  Expanded(
                                    flex: 1,
                                    child: Column(
                                      children: [
                                        Text(
                                          "Play Time",
                                          style: TextStyle(
                                            color: AppColors.White,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                          ),
                                        ),
                                        Text(
                                          controller.adjoeoffer['description'],
                                          style: TextStyle(
                                            color: AppColors.White,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 12,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                  Expanded(
                                    flex: 1,
                                    child: InkWell(
                                      onTap: () {
                                        Adjoe.showOfferwall();
                                      },
                                      child: Container(
                                        width: double.infinity,
                                        decoration: BoxDecoration(
                                          borderRadius:
                                              BorderRadius.circular(12),
                                          color: AppColors.Amber,
                                        ),
                                        child: const Center(
                                          child: Text(
                                            "Play",
                                            style: TextStyle(
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold,
                                              fontSize: 16,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),

                          const SizedBox(height: 20),

                          // SDK Offers (excluding Adjoe)
                          if (controller.filteredSdkOffers != null &&
                              controller.filteredSdkOffers.isNotEmpty) ...[
                            const Text(
                              'Top Games',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            GridView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              shrinkWrap: true,
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                crossAxisSpacing: 10,
                                mainAxisSpacing: 10,
                                childAspectRatio: 0.7,
                              ),
                              itemCount: controller.filteredSdkOffers.length,
                              itemBuilder: (context, index) {
                                var offer = controller.filteredSdkOffers[index];
                                return OfferCard(
                                  name: offer['name'],
                                  description: offer['description'],
                                  imageUrl: offer['network_image'],
                                  onTap: () => controller.requestContent(1),
                                );
                              },
                            ),
                          ],

                          const SizedBox(height: 20),

                          // Web Offers Section
                          if (controller.weboffers != null &&
                              controller.weboffers.isNotEmpty) ...[
                            const Text(
                              'Discovered Games',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 18,
                              ),
                            ),
                            GridView.builder(
                              physics: const NeverScrollableScrollPhysics(),
                              shrinkWrap: true,
                              gridDelegate:
                                  const SliverGridDelegateWithFixedCrossAxisCount(
                                crossAxisCount: 2,
                                crossAxisSpacing: 10,
                                mainAxisSpacing: 10,
                                childAspectRatio: 0.7,
                              ),
                              itemCount: controller.weboffers.length,
                              itemBuilder: (context, index) {
                                var offer = controller.weboffers[index];
                                return OfferCard(
                                  name: offer['name'],
                                  description: offer['description'],
                                  imageUrl: offer['network_image'],
                                  onTap: () {
                                    String url = offer['data'].replaceAll(
                                        '[app_uid]',
                                        GetStorage().read('userid'));
                                    controller.LaunchUrl(url);
                                  },
                                );
                              },
                            ),
                          ],
                        ],
                      ),
                    ),
                  );
                },
              );
            }
          },
        ),
      ),
    );
  }
}

// Reusable OfferCard Widget
class OfferCard extends StatelessWidget {
  final String name;
  final String description;
  final String imageUrl;
  final VoidCallback onTap;

  const OfferCard({
    required this.name,
    required this.description,
    required this.imageUrl,
    required this.onTap,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [AppColors.Mauveine, AppColors.Grape],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Expanded(
            flex: 3,
            child: Container(
              margin: const EdgeInsets.all(5),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(6),
                color: AppColors.Eerieblack,
              ),
              width: double.infinity,
              child: Image.network(imageUrl, fit: BoxFit.fill),
            ),
          ),
          Expanded(
            flex: 1,
            child: Column(
              children: [
                Text(
                  name,
                  style: const TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold),
                ),
                Text(
                  description,
                  style: const TextStyle(color: Colors.white, fontSize: 12),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          Expanded(
            flex: 1,
            child: InkWell(
              onTap: onTap,
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: AppColors.Amber,
                ),
                child: const Center(
                  child: Text(
                    "Play",
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
