//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncAssetPartnerDeleteV1 {
  /// Returns a new [SyncAssetPartnerDeleteV1] instance.
  SyncAssetPartnerDeleteV1({
    required this.deletedAt,
    required this.id,
  });

  String deletedAt;

  String id;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncAssetPartnerDeleteV1 &&
    other.deletedAt == deletedAt &&
    other.id == id;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (deletedAt.hashCode) +
    (id.hashCode);

  @override
  String toString() => 'SyncAssetPartnerDeleteV1[deletedAt=$deletedAt, id=$id]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'deletedAt'] = this.deletedAt;
      json[r'id'] = this.id;
    return json;
  }

  /// Returns a new [SyncAssetPartnerDeleteV1] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncAssetPartnerDeleteV1? fromJson(dynamic value) {
    upgradeDto(value, "SyncAssetPartnerDeleteV1");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncAssetPartnerDeleteV1(
        deletedAt: mapValueOfType<String>(json, r'deletedAt')!,
        id: mapValueOfType<String>(json, r'id')!,
      );
    }
    return null;
  }

  static List<SyncAssetPartnerDeleteV1> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAssetPartnerDeleteV1>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAssetPartnerDeleteV1.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncAssetPartnerDeleteV1> mapFromJson(dynamic json) {
    final map = <String, SyncAssetPartnerDeleteV1>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncAssetPartnerDeleteV1.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncAssetPartnerDeleteV1-objects as value to a dart map
  static Map<String, List<SyncAssetPartnerDeleteV1>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncAssetPartnerDeleteV1>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncAssetPartnerDeleteV1.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'deletedAt',
    'id',
  };
}

