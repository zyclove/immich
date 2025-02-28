import 'dart:math';

import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:immich_mobile/routing/router.dart';
import 'package:immich_mobile/widgets/common/transparent_image.dart';
import 'package:photo_manager/photo_manager.dart';

typedef GetLocalAlbums = Future<List<AssetPathEntity>> Function();

@RoutePage()
class TroubleshootAlbumsListPage extends StatelessWidget {
  final String name;
  final GetLocalAlbums _getLocalAlbums;

  const TroubleshootAlbumsListPage({
    super.key,
    required this.name,
    required GetLocalAlbums getLocalAlbums,
  }) : _getLocalAlbums = getLocalAlbums;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(name)),
      body: FutureBuilder<List<AssetPathEntity>>(
        future: _getLocalAlbums(),
        builder: (ctx, snap) {
          if (snap.hasData) {
            final albums = snap.data as List<AssetPathEntity>;
            return ListView.builder(
              itemBuilder: (c, index) {
                final album = albums[index];
                return GestureDetector(
                  // ignore: prefer-extracting-callbacks
                  onTap: () {
                    // ignore: avoid-async-call-in-sync-function
                    c.router.push(TroubleshootAlbumAssetRoute(album: album));
                  },
                  child: ListTile(
                    leading: FutureBuilder(
                      future: album.getAssetListRange(start: 0, end: 30),
                      builder: (_, img) {
                        if (img.hasData) {
                          final data = img.data as List<AssetEntity>;
                          return FutureBuilder(
                            future: data
                                .elementAtOrNull(Random().nextInt(data.length))
                                ?.thumbnailData,
                            builder: (_, s) {
                              if (s.hasData) {
                                return Image.memory(
                                  s.data ?? kTransparentImage,
                                  semanticLabel: 'Thumb',
                                );
                              } else if (s.hasError) {
                                return Text('Error: ${s.error!}');
                              }
                              return const CircularProgressIndicator();
                            },
                          );
                        } else if (snap.hasError) {
                          return Text('Error: ${snap.error!}');
                        }
                        return const CircularProgressIndicator();
                      },
                    ),
                    title: Text(album.name),
                    subtitle: Text(album.lastModified?.toString() ?? ''),
                    trailing: FutureBuilder(
                      future: album.assetCountAsync,
                      builder: (_, count) {
                        if (count.hasData) {
                          return Text('${count.data!} assets');
                        }
                        return const Text('--');
                      },
                    ),
                  ),
                );
              },
              itemCount: albums.length,
            );
          } else if (snap.hasError) {
            return Text('Error: ${snap.error!}');
          }
          return const Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}
