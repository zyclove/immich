import 'dart:async';
import 'dart:typed_data';

import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:photo_manager/photo_manager.dart';

@RoutePage()
class TroubleshootAlbumAssetPage extends StatefulWidget {
  const TroubleshootAlbumAssetPage({super.key, required this.album});

  final AssetPathEntity album;

  @override
  State createState() => _TroubleshootAlbumAssetPageState();
}

class _TroubleshootAlbumAssetPageState
    extends State<TroubleshootAlbumAssetPage> {
  List<Widget> _assets = [];
  int _currentPage = 0;
  int? _lastPage;

  @override
  void initState() {
    super.initState();
    unawaited(_getNextPage());
  }

  void _handleScroll(ScrollNotification scroll) {
    if (scroll.metrics.pixels / scroll.metrics.maxScrollExtent > 0.33 &&
        _currentPage != _lastPage) {
      unawaited(_getNextPage());
    }
  }

  Future<void> _getNextPage() async {
    _lastPage = _currentPage;
    List<AssetEntity> media =
        await widget.album.getAssetListPaged(page: _currentPage, size: 60);
    List<Widget> _tAssets = [];
    for (final asset in media) {
      _tAssets.add(
        FutureBuilder(
          future: asset.thumbnailDataWithSize(const ThumbnailSize(200, 200)),
          builder: (BuildContext context, AsyncSnapshot<Uint8List?> snapshot) {
            if (snapshot.hasData) {
              return Image.memory(
                snapshot.data!,
                semanticLabel: '',
                fit: BoxFit.cover,
              );
            }
            return Container();
          },
        ),
      );
    }
    if (context.mounted) {
      setState(() {
        _assets.addAll(_tAssets);
        _currentPage++;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.album.name)),
      body: NotificationListener<ScrollNotification>(
        // ignore: prefer-extracting-callbacks
        onNotification: (ScrollNotification scroll) {
          _handleScroll(scroll);
          return false;
        },
        child: GridView.builder(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 4,
          ),
          itemBuilder: (BuildContext _, int index) {
            return _assets[index];
          },
          itemCount: _assets.length,
        ),
      ),
    );
  }
}
