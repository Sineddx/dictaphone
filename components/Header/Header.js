import {Appbar} from "react-native-paper";
import i18n from "i18n-js";
import {pl, en, es} from '../../languages'
import * as Localization from 'expo-localization';

i18n.fallbacks = true;
i18n.translations = {pl, en, es}
i18n.locale = Localization.locale;

const Header = () => (
    <Appbar.Header>
        <Appbar.Content title={i18n.t('header')}/>
    </Appbar.Header>
)

export default Header;