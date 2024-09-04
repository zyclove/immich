// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

import 'package:collection/collection.dart';

class RejectResult {
  final String localId;
  final String remoteId;

  RejectResult({
    required this.localId,
    required this.remoteId,
  });

  RejectResult copyWith({
    String? localId,
    String? remoteId,
  }) {
    return RejectResult(
      localId: localId ?? this.localId,
      remoteId: remoteId ?? this.remoteId,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'localId': localId,
      'remoteId': remoteId,
    };
  }

  factory RejectResult.fromMap(Map<String, dynamic> map) {
    return RejectResult(
      localId: map['localId'] as String,
      remoteId: map['remoteId'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory RejectResult.fromJson(String source) =>
      RejectResult.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'RejectResult(localId: $localId, remoteId: $remoteId)';

  @override
  bool operator ==(covariant RejectResult other) {
    if (identical(this, other)) return true;

    return other.localId == localId && other.remoteId == remoteId;
  }

  @override
  int get hashCode => localId.hashCode ^ remoteId.hashCode;
}

class AcceptResult {
  final String localId;

  AcceptResult({
    required this.localId,
  });

  AcceptResult copyWith({
    String? localId,
  }) {
    return AcceptResult(
      localId: localId ?? this.localId,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'localId': localId,
    };
  }

  factory AcceptResult.fromMap(Map<String, dynamic> map) {
    return AcceptResult(
      localId: map['localId'] as String,
    );
  }

  String toJson() => json.encode(toMap());

  factory AcceptResult.fromJson(String source) =>
      AcceptResult.fromMap(json.decode(source) as Map<String, dynamic>);

  @override
  String toString() => 'AcceptResult(localId: $localId)';

  @override
  bool operator ==(covariant AcceptResult other) {
    if (identical(this, other)) return true;

    return other.localId == localId;
  }

  @override
  int get hashCode => localId.hashCode;
}

class BulkUploadCheckResult {
  List<RejectResult> rejects;
  List<AcceptResult> accepts;

  BulkUploadCheckResult({
    required this.rejects,
    required this.accepts,
  });

  BulkUploadCheckResult copyWith({
    List<RejectResult>? rejects,
    List<AcceptResult>? accepts,
  }) {
    return BulkUploadCheckResult(
      rejects: rejects ?? this.rejects,
      accepts: accepts ?? this.accepts,
    );
  }

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'rejects': rejects.map((x) => x.toMap()).toList(),
      'accepts': accepts.map((x) => x.toMap()).toList(),
    };
  }

  factory BulkUploadCheckResult.fromMap(Map<String, dynamic> map) {
    return BulkUploadCheckResult(
      rejects: List<RejectResult>.from(
        (map['rejects'] as List<int>).map<RejectResult>(
          (x) => RejectResult.fromMap(x as Map<String, dynamic>),
        ),
      ),
      accepts: List<AcceptResult>.from(
        (map['accepts'] as List<int>).map<AcceptResult>(
          (x) => AcceptResult.fromMap(x as Map<String, dynamic>),
        ),
      ),
    );
  }

  String toJson() => json.encode(toMap());

  factory BulkUploadCheckResult.fromJson(String source) =>
      BulkUploadCheckResult.fromMap(
        json.decode(source) as Map<String, dynamic>,
      );

  @override
  String toString() =>
      'BulkUploadCheckResult(rejects: $rejects, accepts: $accepts)';

  @override
  bool operator ==(covariant BulkUploadCheckResult other) {
    if (identical(this, other)) return true;
    final listEquals = const DeepCollectionEquality().equals;

    return listEquals(other.rejects, rejects) &&
        listEquals(other.accepts, accepts);
  }

  @override
  int get hashCode => rejects.hashCode ^ accepts.hashCode;
}
