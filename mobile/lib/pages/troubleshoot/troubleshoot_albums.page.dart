// ignore_for_file: prefer-single-widget-per-file, prefer-extracting-callbacks, avoid-async-call-in-sync-function

import 'dart:io';

import 'package:auto_route/auto_route.dart';
import 'package:device_info_plus/device_info_plus.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:immich_mobile/extensions/build_context_extensions.dart';
import 'package:immich_mobile/routing/router.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:photo_manager/photo_manager.dart';

Future<List<AssetPathEntity>> _getLocalAlbumsNoFilter() async {
  return await PhotoManager.getAssetPathList();
}

Future<List<AssetPathEntity>> _getLocalAlbumsPathModified() async {
  return await PhotoManager.getAssetPathList(
    filterOption: FilterOptionGroup(containsPathModified: true),
  );
}

Future<List<AssetPathEntity>> _getLocalAlbumsWithIgnoreSize() async {
  return await PhotoManager.getAssetPathList(
    filterOption: FilterOptionGroup(
      imageOption:
          const FilterOption(sizeConstraint: SizeConstraint(ignoreSize: true)),
      videoOption:
          const FilterOption(sizeConstraint: SizeConstraint(ignoreSize: true)),
      containsPathModified: true,
    ),
  );
}

@RoutePage()
class TroubleshootAlbumsPage extends HookWidget {
  const TroubleshootAlbumsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Troubleshoot Local Albums')),
      body: Column(
        children: [
          const _NumberedWidget(number: 1, child: _PermissionWidget1()),
          const _NumberedWidget(number: 2, child: _PermissionWidget2()),
          _NumberedWidget(
            number: 3,
            child: TextButton(
              onPressed: () {
                context.router.push(
                  TroubleshootAlbumsListRoute(
                    name: "Check Albums without Filter",
                    getLocalAlbums: _getLocalAlbumsNoFilter,
                  ),
                );
              },
              child: const Text("Check Albums without Filter"),
            ),
          ),
          _NumberedWidget(
            number: 4,
            child: TextButton(
              onPressed: () {
                context.router.push(
                  TroubleshootAlbumsListRoute(
                    name: "Check Albums with Path modified",
                    getLocalAlbums: _getLocalAlbumsPathModified,
                  ),
                );
              },
              child: const Text("Check Albums with Path modified"),
            ),
          ),
          _NumberedWidget(
            number: 5,
            child: TextButton(
              onPressed: () {
                context.router.push(
                  TroubleshootAlbumsListRoute(
                    name: "Check Albums with Ignore Size",
                    getLocalAlbums: _getLocalAlbumsWithIgnoreSize,
                  ),
                );
              },
              child: const Text("Check Albums with Ignore Size"),
            ),
          ),
        ],
      ),
    );
  }
}

class _NumberedWidget extends StatelessWidget {
  final int number;
  final Widget child;
  const _NumberedWidget({required this.number, required this.child});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // ignore: avoid-wrapping-in-padding
        Padding(
          padding: const EdgeInsets.only(top: 10),
          child: Container(
            decoration: BoxDecoration(
              color: context.colorScheme.secondaryContainer,
              borderRadius: const BorderRadius.all(Radius.circular(50.0)),
            ),
            width: 20,
            height: 20,
            child: Center(
              child: Text(
                '$number',
                style: context.textTheme.bodySmall
                    ?.copyWith(fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ),
        child,
      ],
    );
  }
}

class _PermissionWidget1 extends HookWidget {
  const _PermissionWidget1();

  /// Requests the gallery permission
  Future<PermissionStatus> _requestGalleryPermission() async {
    PermissionStatus result;
    // Android 32 and below uses Permission.storage
    if (Platform.isAndroid) {
      final androidInfo = await DeviceInfoPlugin().androidInfo;
      if (androidInfo.version.sdkInt <= 32) {
        // Android 32 and below need storage
        final permission = await Permission.storage.request();
        result = permission;
      } else {
        // Android 33 need photo & video
        final photos = await Permission.photos.request();
        if (!photos.isGranted) {
          // Don't ask twice for the same permission
          return photos;
        }
        final videos = await Permission.videos.request();

        // Return the joint result of those two permissions
        final PermissionStatus status;
        if ((photos.isGranted && videos.isGranted) ||
            (photos.isLimited && videos.isLimited)) {
          status = PermissionStatus.granted;
        } else if (photos.isDenied || videos.isDenied) {
          status = PermissionStatus.denied;
        } else if (photos.isPermanentlyDenied || videos.isPermanentlyDenied) {
          status = PermissionStatus.permanentlyDenied;
        } else {
          status = PermissionStatus.denied;
        }

        result = status;
      }
      if (result == PermissionStatus.granted &&
          androidInfo.version.sdkInt >= 29) {
        result = await Permission.accessMediaLocation.request();
      }
    } else {
      // iOS can use photos
      final photos = await Permission.photos.request();
      result = photos;
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    final status = useState<PermissionStatus?>(null);

    return Column(
      children: [
        TextButton(
          onPressed: () {
            _requestGalleryPermission().then((v) => status.value = v);
          },
          child: const Text("Check Permissions - 1"),
        ),
        if (status.value != null) Text("Permission Status: ${status.value}"),
      ],
    );
  }
}

class _PermissionWidget2 extends HookWidget {
  const _PermissionWidget2();

  /// Requests the gallery permission
  Future<PermissionState> _requestGalleryPermission() async {
    await PhotoManager.requestPermissionExtend();
    return await PhotoManager.getPermissionState(
      requestOption: const PermissionRequestOption(
        androidPermission:
            AndroidPermission(type: RequestType.common, mediaLocation: true),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final status = useState<PermissionState?>(null);

    return Column(
      children: [
        TextButton(
          onPressed: () {
            _requestGalleryPermission().then((v) => status.value = v);
          },
          child: const Text("Check Permissions - 2"),
        ),
        if (status.value != null) Text("Permission State: ${status.value}"),
      ],
    );
  }
}
