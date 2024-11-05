//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class SyncAcknowledgeDto {
  /// Returns a new [SyncAcknowledgeDto] instance.
  SyncAcknowledgeDto({
    required this.timestamp,
    required this.type,
  });

  String timestamp;

  SyncAcknowledgeDtoTypeEnum type;

  @override
  bool operator ==(Object other) => identical(this, other) || other is SyncAcknowledgeDto &&
    other.timestamp == timestamp &&
    other.type == type;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (timestamp.hashCode) +
    (type.hashCode);

  @override
  String toString() => 'SyncAcknowledgeDto[timestamp=$timestamp, type=$type]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'timestamp'] = this.timestamp;
      json[r'type'] = this.type;
    return json;
  }

  /// Returns a new [SyncAcknowledgeDto] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static SyncAcknowledgeDto? fromJson(dynamic value) {
    upgradeDto(value, "SyncAcknowledgeDto");
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      return SyncAcknowledgeDto(
        timestamp: mapValueOfType<String>(json, r'timestamp')!,
        type: SyncAcknowledgeDtoTypeEnum.fromJson(json[r'type'])!,
      );
    }
    return null;
  }

  static List<SyncAcknowledgeDto> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAcknowledgeDto>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAcknowledgeDto.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, SyncAcknowledgeDto> mapFromJson(dynamic json) {
    final map = <String, SyncAcknowledgeDto>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = SyncAcknowledgeDto.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of SyncAcknowledgeDto-objects as value to a dart map
  static Map<String, List<SyncAcknowledgeDto>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<SyncAcknowledgeDto>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = SyncAcknowledgeDto.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'timestamp',
    'type',
  };
}


class SyncAcknowledgeDtoTypeEnum {
  /// Instantiate a new enum with the provided [value].
  const SyncAcknowledgeDtoTypeEnum._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const activity = SyncAcknowledgeDtoTypeEnum._(r'Activity');
  static const activityDelete = SyncAcknowledgeDtoTypeEnum._(r'ActivityDelete');
  static const assetOwner = SyncAcknowledgeDtoTypeEnum._(r'AssetOwner');
  static const assetOwnerDelete = SyncAcknowledgeDtoTypeEnum._(r'AssetOwnerDelete');
  static const assetPartner = SyncAcknowledgeDtoTypeEnum._(r'AssetPartner');
  static const assetPartnerDelete = SyncAcknowledgeDtoTypeEnum._(r'AssetPartnerDelete');
  static const assetAlbum = SyncAcknowledgeDtoTypeEnum._(r'AssetAlbum');
  static const assetAlbumDelete = SyncAcknowledgeDtoTypeEnum._(r'AssetAlbumDelete');
  static const album = SyncAcknowledgeDtoTypeEnum._(r'Album');
  static const albumDelete = SyncAcknowledgeDtoTypeEnum._(r'AlbumDelete');
  static const memory = SyncAcknowledgeDtoTypeEnum._(r'Memory');
  static const memoryDelete = SyncAcknowledgeDtoTypeEnum._(r'MemoryDelete');
  static const partner = SyncAcknowledgeDtoTypeEnum._(r'Partner');
  static const partnerDelete = SyncAcknowledgeDtoTypeEnum._(r'PartnerDelete');
  static const person = SyncAcknowledgeDtoTypeEnum._(r'Person');
  static const personDelete = SyncAcknowledgeDtoTypeEnum._(r'PersonDelete');
  static const sharedLink = SyncAcknowledgeDtoTypeEnum._(r'SharedLink');
  static const sharedLinkDelete = SyncAcknowledgeDtoTypeEnum._(r'SharedLinkDelete');
  static const stack = SyncAcknowledgeDtoTypeEnum._(r'Stack');
  static const stackDelete = SyncAcknowledgeDtoTypeEnum._(r'StackDelete');
  static const tag = SyncAcknowledgeDtoTypeEnum._(r'Tag');
  static const tagDelete = SyncAcknowledgeDtoTypeEnum._(r'TagDelete');
  static const user = SyncAcknowledgeDtoTypeEnum._(r'User');
  static const userDelete = SyncAcknowledgeDtoTypeEnum._(r'UserDelete');
  static const albumAsset = SyncAcknowledgeDtoTypeEnum._(r'AlbumAsset');
  static const albumAssetDelete = SyncAcknowledgeDtoTypeEnum._(r'AlbumAssetDelete');
  static const albumUser = SyncAcknowledgeDtoTypeEnum._(r'AlbumUser');
  static const albumUserDelete = SyncAcknowledgeDtoTypeEnum._(r'AlbumUserDelete');

  /// List of all possible values in this [enum][SyncAcknowledgeDtoTypeEnum].
  static const values = <SyncAcknowledgeDtoTypeEnum>[
    activity,
    activityDelete,
    assetOwner,
    assetOwnerDelete,
    assetPartner,
    assetPartnerDelete,
    assetAlbum,
    assetAlbumDelete,
    album,
    albumDelete,
    memory,
    memoryDelete,
    partner,
    partnerDelete,
    person,
    personDelete,
    sharedLink,
    sharedLinkDelete,
    stack,
    stackDelete,
    tag,
    tagDelete,
    user,
    userDelete,
    albumAsset,
    albumAssetDelete,
    albumUser,
    albumUserDelete,
  ];

  static SyncAcknowledgeDtoTypeEnum? fromJson(dynamic value) => SyncAcknowledgeDtoTypeEnumTypeTransformer().decode(value);

  static List<SyncAcknowledgeDtoTypeEnum> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <SyncAcknowledgeDtoTypeEnum>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = SyncAcknowledgeDtoTypeEnum.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [SyncAcknowledgeDtoTypeEnum] to String,
/// and [decode] dynamic data back to [SyncAcknowledgeDtoTypeEnum].
class SyncAcknowledgeDtoTypeEnumTypeTransformer {
  factory SyncAcknowledgeDtoTypeEnumTypeTransformer() => _instance ??= const SyncAcknowledgeDtoTypeEnumTypeTransformer._();

  const SyncAcknowledgeDtoTypeEnumTypeTransformer._();

  String encode(SyncAcknowledgeDtoTypeEnum data) => data.value;

  /// Decodes a [dynamic value][data] to a SyncAcknowledgeDtoTypeEnum.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  SyncAcknowledgeDtoTypeEnum? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'Activity': return SyncAcknowledgeDtoTypeEnum.activity;
        case r'ActivityDelete': return SyncAcknowledgeDtoTypeEnum.activityDelete;
        case r'AssetOwner': return SyncAcknowledgeDtoTypeEnum.assetOwner;
        case r'AssetOwnerDelete': return SyncAcknowledgeDtoTypeEnum.assetOwnerDelete;
        case r'AssetPartner': return SyncAcknowledgeDtoTypeEnum.assetPartner;
        case r'AssetPartnerDelete': return SyncAcknowledgeDtoTypeEnum.assetPartnerDelete;
        case r'AssetAlbum': return SyncAcknowledgeDtoTypeEnum.assetAlbum;
        case r'AssetAlbumDelete': return SyncAcknowledgeDtoTypeEnum.assetAlbumDelete;
        case r'Album': return SyncAcknowledgeDtoTypeEnum.album;
        case r'AlbumDelete': return SyncAcknowledgeDtoTypeEnum.albumDelete;
        case r'Memory': return SyncAcknowledgeDtoTypeEnum.memory;
        case r'MemoryDelete': return SyncAcknowledgeDtoTypeEnum.memoryDelete;
        case r'Partner': return SyncAcknowledgeDtoTypeEnum.partner;
        case r'PartnerDelete': return SyncAcknowledgeDtoTypeEnum.partnerDelete;
        case r'Person': return SyncAcknowledgeDtoTypeEnum.person;
        case r'PersonDelete': return SyncAcknowledgeDtoTypeEnum.personDelete;
        case r'SharedLink': return SyncAcknowledgeDtoTypeEnum.sharedLink;
        case r'SharedLinkDelete': return SyncAcknowledgeDtoTypeEnum.sharedLinkDelete;
        case r'Stack': return SyncAcknowledgeDtoTypeEnum.stack;
        case r'StackDelete': return SyncAcknowledgeDtoTypeEnum.stackDelete;
        case r'Tag': return SyncAcknowledgeDtoTypeEnum.tag;
        case r'TagDelete': return SyncAcknowledgeDtoTypeEnum.tagDelete;
        case r'User': return SyncAcknowledgeDtoTypeEnum.user;
        case r'UserDelete': return SyncAcknowledgeDtoTypeEnum.userDelete;
        case r'AlbumAsset': return SyncAcknowledgeDtoTypeEnum.albumAsset;
        case r'AlbumAssetDelete': return SyncAcknowledgeDtoTypeEnum.albumAssetDelete;
        case r'AlbumUser': return SyncAcknowledgeDtoTypeEnum.albumUser;
        case r'AlbumUserDelete': return SyncAcknowledgeDtoTypeEnum.albumUserDelete;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [SyncAcknowledgeDtoTypeEnumTypeTransformer] instance.
  static SyncAcknowledgeDtoTypeEnumTypeTransformer? _instance;
}


