//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncAlbumDtoV1 {
  /// Returns a new [SyncAlbumDtoV1] instance.
  SyncAlbumDtoV1({
    required this.description,
    required this.id,
    required this.name,
  });

  String description;

  String id;

  String name;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncAlbumDtoV1 &&
    other.description == description &&
    other.id == id &&
    other.name == name;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (description.hashCode) +
    (id.hashCode) +
    (name.hashCode);

  @override
  String toString() => 'SyncAlbumDtoV1[description=$description, id=$id, name=$name]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'description'] = this.description;
      json[r'id'] = this.id;
      json[r'name'] = this.name;
    return json;
  }

  /// Returns a new [SyncAlbumDtoV1] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncAlbumDtoV1? fromJson(dynamic value) {
    upgradeDto(value, "SyncAlbumDtoV1");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncAlbumDtoV1(
        description: mapValueOfType<String>(json, r'description')!,
        id: mapValueOfType<String>(json, r'id')!,
        name: mapValueOfType<String>(json, r'name')!,
      );
    }
    return null;
  }

  static List<SyncAlbumDtoV1> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAlbumDtoV1>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAlbumDtoV1.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncAlbumDtoV1> mapFromJson(dynamic json) {
    final map = <String, SyncAlbumDtoV1>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncAlbumDtoV1.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncAlbumDtoV1-objects as value to a dart map
  static Map<String, List<SyncAlbumDtoV1>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncAlbumDtoV1>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncAlbumDtoV1.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'description',
    'id',
    'name',
  };
}

