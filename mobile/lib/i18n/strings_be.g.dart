///
/// Generated file. Do not edit.
///
// coverage:ignore-file
// ignore_for_file: type=lint, unused_import

import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';
import 'package:slang/generated.dart';
import 'strings.g.dart';

// Path: <root>
class TranslationsBe extends Translations {
	/// You can call this constructor and build your own translation instance of this locale.
	/// Constructing via the enum [AppLocale.build] is preferred.
	TranslationsBe({Map<String, Node>? overrides, PluralResolver? cardinalResolver, PluralResolver? ordinalResolver})
		: assert(overrides == null, 'Set "translation_overrides: true" in order to enable this feature.'),
		  $meta = TranslationMetadata(
		    locale: AppLocale.be,
		    overrides: overrides ?? {},
		    cardinalResolver: cardinalResolver,
		    ordinalResolver: ordinalResolver,
		  ),
		  super(cardinalResolver: cardinalResolver, ordinalResolver: ordinalResolver) {
		super.$meta.setFlatMapFunction($meta.getTranslation); // copy base translations to super.$meta
		$meta.setFlatMapFunction(_flatMapFunction);
	}

	/// Metadata for the translations of <be>.
	@override final TranslationMetadata<AppLocale, Translations> $meta;

	/// Access flat map
	@override dynamic operator[](String key) => $meta.getTranslation(key) ?? super.$meta.getTranslation(key);

	late final TranslationsBe _root = this; // ignore: unused_field

	// Translations
	@override String get about => 'Пра праграму';
	@override String get account => 'Уліковы запіс';
	@override String get account_settings => 'Налады акаўнта';
	@override String get acknowledge => 'Пацвердзіць';
	@override String get action => 'Дзеянне';
	@override String get actions => 'Дзеянні';
	@override String get active => 'Актыўны';
	@override String get activity => 'Актыўнасць';
	@override String get activity_changed => 'Актыўнасць {enabled, select, true {уключана} other {адключана}}';
	@override String get add => 'Дадаць';
	@override String get add_a_description => 'Дадаць апісанне';
	@override String get add_a_location => 'Дадаць месца';
	@override String get add_a_name => 'Дадаць імя';
	@override String get add_a_title => 'Дадаць загаловак';
	@override String get add_exclusion_pattern => 'Дадаць шаблон выключэння';
	@override String get add_import_path => 'Дадаць шлях імпарту';
	@override String get add_location => 'Дадайце месца';
	@override String get add_more_users => 'Дадаць больш карыстальнікаў';
	@override String get add_partner => 'Дадаць партнёра';
	@override String get add_path => 'Дадаць шлях';
	@override String get add_photos => 'Дадаць фота';
	@override String get add_to => 'Дадаць у...';
	@override String get add_to_album => 'Дадаць у альбом';
	@override String get add_to_shared_album => 'Дадаць у агульны альбом';
	@override String get added_to_archive => 'Дададзена ў архіў';
	@override String get added_to_favorites => 'Дададзена ў абраныя';
	@override String get added_to_favorites_count => 'Дададзена {count, number} да абранага';
	@override late final _TranslationsAdminBe admin = _TranslationsAdminBe._(_root);
}

// Path: admin
class _TranslationsAdminBe extends TranslationsAdminEn {
	_TranslationsAdminBe._(TranslationsBe root) : this._root = root, super.internal(root);

	final TranslationsBe _root; // ignore: unused_field

	// Translations
	@override String get add_exclusion_pattern_description => 'Дадайце шаблоны выключэнняў. Падтрымліваецца выкарыстанне сімвалаў * , ** і ?. Каб ігнараваць усе файлы ў любой дырэкторыі з назвай "Raw", выкарыстоўвайце "**/Raw/**". Каб ігнараваць усе файлы, якія заканчваюцца на ".tif", выкарыстоўвайце "**/.tif". Каб ігнараваць абсолютны шлях, выкарыстоўвайце "/path/to/ignore/**".';
}

/// Flat map(s) containing all translations.
/// Only for edge cases! For simple maps, use the map function of this library.
extension on TranslationsBe {
	dynamic _flatMapFunction(String path) {
		switch (path) {
			case 'about': return 'Пра праграму';
			case 'account': return 'Уліковы запіс';
			case 'account_settings': return 'Налады акаўнта';
			case 'acknowledge': return 'Пацвердзіць';
			case 'action': return 'Дзеянне';
			case 'actions': return 'Дзеянні';
			case 'active': return 'Актыўны';
			case 'activity': return 'Актыўнасць';
			case 'activity_changed': return 'Актыўнасць {enabled, select, true {уключана} other {адключана}}';
			case 'add': return 'Дадаць';
			case 'add_a_description': return 'Дадаць апісанне';
			case 'add_a_location': return 'Дадаць месца';
			case 'add_a_name': return 'Дадаць імя';
			case 'add_a_title': return 'Дадаць загаловак';
			case 'add_exclusion_pattern': return 'Дадаць шаблон выключэння';
			case 'add_import_path': return 'Дадаць шлях імпарту';
			case 'add_location': return 'Дадайце месца';
			case 'add_more_users': return 'Дадаць больш карыстальнікаў';
			case 'add_partner': return 'Дадаць партнёра';
			case 'add_path': return 'Дадаць шлях';
			case 'add_photos': return 'Дадаць фота';
			case 'add_to': return 'Дадаць у...';
			case 'add_to_album': return 'Дадаць у альбом';
			case 'add_to_shared_album': return 'Дадаць у агульны альбом';
			case 'added_to_archive': return 'Дададзена ў архіў';
			case 'added_to_favorites': return 'Дададзена ў абраныя';
			case 'added_to_favorites_count': return 'Дададзена {count, number} да абранага';
			case 'admin.add_exclusion_pattern_description': return 'Дадайце шаблоны выключэнняў. Падтрымліваецца выкарыстанне сімвалаў * , ** і ?. Каб ігнараваць усе файлы ў любой дырэкторыі з назвай "Raw", выкарыстоўвайце "**/Raw/**". Каб ігнараваць усе файлы, якія заканчваюцца на ".tif", выкарыстоўвайце "**/.tif". Каб ігнараваць абсолютны шлях, выкарыстоўвайце "/path/to/ignore/**".';
			default: return null;
		}
	}
}

