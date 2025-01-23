import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:immich_mobile/repositories/archive.repository.dart';

final archiveServiceProvider = Provider((ref) {
  return ArchiveService(ref.watch(archiveRepositoryProvider));
});

class ArchiveService {
  final ArchiveRepository repository;
  ArchiveService(this.repository);

  getTimelineQuery(int userIsarId) {
    return repository.getTimelineQuery(userIsarId);
  }
}
