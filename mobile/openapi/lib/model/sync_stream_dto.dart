//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncStreamDto {
  /// Returns a new [SyncStreamDto] instance.
  SyncStreamDto({
    this.types = const [],
  });

  List<SyncStreamDtoTypesEnum> types;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncStreamDto &&
    _deepEquality.equals(other.types, types);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (types.hashCode);

  @override
  String toString() => 'SyncStreamDto[types=$types]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'types'] = this.types;
    return json;
  }

  /// Returns a new [SyncStreamDto] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncStreamDto? fromJson(dynamic value) {
    upgradeDto(value, "SyncStreamDto");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncStreamDto(
        types: SyncStreamDtoTypesEnum.listFromJson(json[r'types']),
      );
    }
    return null;
  }

  static List<SyncStreamDto> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncStreamDto>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncStreamDto.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncStreamDto> mapFromJson(dynamic json) {
    final map = <String, SyncStreamDto>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncStreamDto.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncStreamDto-objects as value to a dart map
  static Map<String, List<SyncStreamDto>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncStreamDto>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncStreamDto.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'types',
  };
}


class SyncStreamDtoTypesEnum {
  /// Instantiate a new enum with the provided [value].
  const SyncStreamDtoTypesEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const activityV1 = SyncStreamDtoTypesEnum._(r'ActivityV1');
  static const activityDeleteV1 = SyncStreamDtoTypesEnum._(r'ActivityDeleteV1');
  static const assetOwnerV1 = SyncStreamDtoTypesEnum._(r'AssetOwnerV1');
  static const assetOwnerDeleteV1 = SyncStreamDtoTypesEnum._(r'AssetOwnerDeleteV1');
  static const assetPartnerV1 = SyncStreamDtoTypesEnum._(r'AssetPartnerV1');
  static const assetPartnerDeleteV1 = SyncStreamDtoTypesEnum._(r'AssetPartnerDeleteV1');
  static const assetAlbumV1 = SyncStreamDtoTypesEnum._(r'AssetAlbumV1');
  static const assetAlbumDeleteV1 = SyncStreamDtoTypesEnum._(r'AssetAlbumDeleteV1');
  static const albumV1 = SyncStreamDtoTypesEnum._(r'AlbumV1');
  static const albumDeleteV1 = SyncStreamDtoTypesEnum._(r'AlbumDeleteV1');
  static const memoryV1 = SyncStreamDtoTypesEnum._(r'MemoryV1');
  static const memoryDeleteV1 = SyncStreamDtoTypesEnum._(r'MemoryDeleteV1');
  static const partnerV1 = SyncStreamDtoTypesEnum._(r'PartnerV1');
  static const partnerDeleteV1 = SyncStreamDtoTypesEnum._(r'PartnerDeleteV1');
  static const personV1 = SyncStreamDtoTypesEnum._(r'PersonV1');
  static const personDeleteV1 = SyncStreamDtoTypesEnum._(r'PersonDeleteV1');
  static const sharedLinkV1 = SyncStreamDtoTypesEnum._(r'SharedLinkV1');
  static const sharedLinkDeleteV1 = SyncStreamDtoTypesEnum._(r'SharedLinkDeleteV1');
  static const stackV1 = SyncStreamDtoTypesEnum._(r'StackV1');
  static const stackDeleteV1 = SyncStreamDtoTypesEnum._(r'StackDeleteV1');
  static const tagV1 = SyncStreamDtoTypesEnum._(r'TagV1');
  static const tagDeleteV1 = SyncStreamDtoTypesEnum._(r'TagDeleteV1');
  static const userV1 = SyncStreamDtoTypesEnum._(r'UserV1');
  static const userDeleteV1 = SyncStreamDtoTypesEnum._(r'UserDeleteV1');
  static const albumAssetV1 = SyncStreamDtoTypesEnum._(r'AlbumAssetV1');
  static const albumAssetDeleteV1 = SyncStreamDtoTypesEnum._(r'AlbumAssetDeleteV1');
  static const albumUserV1 = SyncStreamDtoTypesEnum._(r'AlbumUserV1');
  static const albumDeleteUserV1 = SyncStreamDtoTypesEnum._(r'AlbumDeleteUserV1');

  /// List of all possible values in this [enum][SyncStreamDtoTypesEnum].
  static const values = <SyncStreamDtoTypesEnum>[
    activityV1,
    activityDeleteV1,
    assetOwnerV1,
    assetOwnerDeleteV1,
    assetPartnerV1,
    assetPartnerDeleteV1,
    assetAlbumV1,
    assetAlbumDeleteV1,
    albumV1,
    albumDeleteV1,
    memoryV1,
    memoryDeleteV1,
    partnerV1,
    partnerDeleteV1,
    personV1,
    personDeleteV1,
    sharedLinkV1,
    sharedLinkDeleteV1,
    stackV1,
    stackDeleteV1,
    tagV1,
    tagDeleteV1,
    userV1,
    userDeleteV1,
    albumAssetV1,
    albumAssetDeleteV1,
    albumUserV1,
    albumDeleteUserV1,
  ];

  static SyncStreamDtoTypesEnum? fromJson(dynamic value) => SyncStreamDtoTypesEnumTypeTransformer().decode(value);

  static List<SyncStreamDtoTypesEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncStreamDtoTypesEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncStreamDtoTypesEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [SyncStreamDtoTypesEnum] to String,
/// and [decode] dynamic data back to [SyncStreamDtoTypesEnum].
class SyncStreamDtoTypesEnumTypeTransformer {
  factory SyncStreamDtoTypesEnumTypeTransformer() => _instance ??= const SyncStreamDtoTypesEnumTypeTransformer._();

  const SyncStreamDtoTypesEnumTypeTransformer._();

  String encode(SyncStreamDtoTypesEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a SyncStreamDtoTypesEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  SyncStreamDtoTypesEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'ActivityV1': return SyncStreamDtoTypesEnum.activityV1;
        case r'ActivityDeleteV1': return SyncStreamDtoTypesEnum.activityDeleteV1;
        case r'AssetOwnerV1': return SyncStreamDtoTypesEnum.assetOwnerV1;
        case r'AssetOwnerDeleteV1': return SyncStreamDtoTypesEnum.assetOwnerDeleteV1;
        case r'AssetPartnerV1': return SyncStreamDtoTypesEnum.assetPartnerV1;
        case r'AssetPartnerDeleteV1': return SyncStreamDtoTypesEnum.assetPartnerDeleteV1;
        case r'AssetAlbumV1': return SyncStreamDtoTypesEnum.assetAlbumV1;
        case r'AssetAlbumDeleteV1': return SyncStreamDtoTypesEnum.assetAlbumDeleteV1;
        case r'AlbumV1': return SyncStreamDtoTypesEnum.albumV1;
        case r'AlbumDeleteV1': return SyncStreamDtoTypesEnum.albumDeleteV1;
        case r'MemoryV1': return SyncStreamDtoTypesEnum.memoryV1;
        case r'MemoryDeleteV1': return SyncStreamDtoTypesEnum.memoryDeleteV1;
        case r'PartnerV1': return SyncStreamDtoTypesEnum.partnerV1;
        case r'PartnerDeleteV1': return SyncStreamDtoTypesEnum.partnerDeleteV1;
        case r'PersonV1': return SyncStreamDtoTypesEnum.personV1;
        case r'PersonDeleteV1': return SyncStreamDtoTypesEnum.personDeleteV1;
        case r'SharedLinkV1': return SyncStreamDtoTypesEnum.sharedLinkV1;
        case r'SharedLinkDeleteV1': return SyncStreamDtoTypesEnum.sharedLinkDeleteV1;
        case r'StackV1': return SyncStreamDtoTypesEnum.stackV1;
        case r'StackDeleteV1': return SyncStreamDtoTypesEnum.stackDeleteV1;
        case r'TagV1': return SyncStreamDtoTypesEnum.tagV1;
        case r'TagDeleteV1': return SyncStreamDtoTypesEnum.tagDeleteV1;
        case r'UserV1': return SyncStreamDtoTypesEnum.userV1;
        case r'UserDeleteV1': return SyncStreamDtoTypesEnum.userDeleteV1;
        case r'AlbumAssetV1': return SyncStreamDtoTypesEnum.albumAssetV1;
        case r'AlbumAssetDeleteV1': return SyncStreamDtoTypesEnum.albumAssetDeleteV1;
        case r'AlbumUserV1': return SyncStreamDtoTypesEnum.albumUserV1;
        case r'AlbumDeleteUserV1': return SyncStreamDtoTypesEnum.albumDeleteUserV1;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [SyncStreamDtoTypesEnumTypeTransformer] instance.
  static SyncStreamDtoTypesEnumTypeTransformer? _instance;
}


