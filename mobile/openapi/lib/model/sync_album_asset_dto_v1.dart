//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncAlbumAssetDtoV1 {
  /// Returns a new [SyncAlbumAssetDtoV1] instance.
  SyncAlbumAssetDtoV1({
    required this.albumId,
    required this.assetId,
    required this.createdAt,
  });

  String albumId;

  String assetId;

  String createdAt;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncAlbumAssetDtoV1 &&
    other.albumId == albumId &&
    other.assetId == assetId &&
    other.createdAt == createdAt;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (albumId.hashCode) +
    (assetId.hashCode) +
    (createdAt.hashCode);

  @override
  String toString() => 'SyncAlbumAssetDtoV1[albumId=$albumId, assetId=$assetId, createdAt=$createdAt]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'albumId'] = this.albumId;
      json[r'assetId'] = this.assetId;
      json[r'createdAt'] = this.createdAt;
    return json;
  }

  /// Returns a new [SyncAlbumAssetDtoV1] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncAlbumAssetDtoV1? fromJson(dynamic value) {
    upgradeDto(value, "SyncAlbumAssetDtoV1");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncAlbumAssetDtoV1(
        albumId: mapValueOfType<String>(json, r'albumId')!,
        assetId: mapValueOfType<String>(json, r'assetId')!,
        createdAt: mapValueOfType<String>(json, r'createdAt')!,
      );
    }
    return null;
  }

  static List<SyncAlbumAssetDtoV1> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAlbumAssetDtoV1>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAlbumAssetDtoV1.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncAlbumAssetDtoV1> mapFromJson(dynamic json) {
    final map = <String, SyncAlbumAssetDtoV1>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncAlbumAssetDtoV1.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncAlbumAssetDtoV1-objects as value to a dart map
  static Map<String, List<SyncAlbumAssetDtoV1>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncAlbumAssetDtoV1>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncAlbumAssetDtoV1.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'albumId',
    'assetId',
    'createdAt',
  };
}

