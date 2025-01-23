import 'package:immich_mobile/entities/asset.entity.dart';
import 'package:immich_mobile/interfaces/database.interface.dart';
import 'package:isar/isar.dart';

abstract interface class IArchiveRepository implements IDatabaseRepository {
  QueryBuilder<Asset, Asset, QAfterSortBy> getTimelineQuery(int userIsarId);
}
