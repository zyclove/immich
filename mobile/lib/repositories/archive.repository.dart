import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/entities/asset.entity.dart';
import 'package:immich_mobile/interfaces/archive.interface.dart';
import 'package:immich_mobile/providers/db.provider.dart';
import 'package:immich_mobile/repositories/database.repository.dart';
import 'package:isar/isar.dart';

final archiveRepositoryProvider =
    Provider((ref) => ArchiveRepository(ref.watch(dbProvider)));

class ArchiveRepository extends DatabaseRepository
    implements IArchiveRepository {
  ArchiveRepository(super.db);

  @override
  QueryBuilder<Asset, Asset, QAfterSortBy> getTimelineQuery(int userIsarId) {
    return db.assets
        .where()
        .ownerIdEqualToAnyChecksum(userIsarId)
        .filter()
        .isArchivedEqualTo(true)
        .isTrashedEqualTo(false)
        .sortByFileCreatedAtDesc();
  }
}
