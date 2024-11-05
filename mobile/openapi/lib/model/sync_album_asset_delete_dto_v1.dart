//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncAlbumAssetDeleteDtoV1 {
  /// Returns a new [SyncAlbumAssetDeleteDtoV1] instance.
  SyncAlbumAssetDeleteDtoV1({
    required this.albumId,
    required this.assetId,
    required this.deletedAt,
  });

  String albumId;

  String assetId;

  String deletedAt;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncAlbumAssetDeleteDtoV1 &&
    other.albumId == albumId &&
    other.assetId == assetId &&
    other.deletedAt == deletedAt;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (albumId.hashCode) +
    (assetId.hashCode) +
    (deletedAt.hashCode);

  @override
  String toString() => 'SyncAlbumAssetDeleteDtoV1[albumId=$albumId, assetId=$assetId, deletedAt=$deletedAt]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'albumId'] = this.albumId;
      json[r'assetId'] = this.assetId;
      json[r'deletedAt'] = this.deletedAt;
    return json;
  }

  /// Returns a new [SyncAlbumAssetDeleteDtoV1] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncAlbumAssetDeleteDtoV1? fromJson(dynamic value) {
    upgradeDto(value, "SyncAlbumAssetDeleteDtoV1");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncAlbumAssetDeleteDtoV1(
        albumId: mapValueOfType<String>(json, r'albumId')!,
        assetId: mapValueOfType<String>(json, r'assetId')!,
        deletedAt: mapValueOfType<String>(json, r'deletedAt')!,
      );
    }
    return null;
  }

  static List<SyncAlbumAssetDeleteDtoV1> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAlbumAssetDeleteDtoV1>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAlbumAssetDeleteDtoV1.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncAlbumAssetDeleteDtoV1> mapFromJson(dynamic json) {
    final map = <String, SyncAlbumAssetDeleteDtoV1>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncAlbumAssetDeleteDtoV1.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncAlbumAssetDeleteDtoV1-objects as value to a dart map
  static Map<String, List<SyncAlbumAssetDeleteDtoV1>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncAlbumAssetDeleteDtoV1>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncAlbumAssetDeleteDtoV1.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'albumId',
    'assetId',
    'deletedAt',
  };
}

