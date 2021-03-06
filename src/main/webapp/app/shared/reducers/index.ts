import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import survey, { SurveyState } from 'app/entities/survey/survey.reducer';
import surveyResponse, { SurveyResponseState } from 'app/entities/survey-response/survey-response.reducer';
import chatBot, { ChatBotState } from 'app/modules/survey-chat/chatbot.reducer';
import results, { ResultsState } from 'app/modules/results/results.reducer';
import dbTool, { DbToolState } from 'app/modules/db-tool/db-tool.reducer';

import header, { HeaderState } from 'app/shared/reducers/header';
// prettier-ignore
import newsPost, {
  NewsPostState
} from 'app/entities/news-post/news-post.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly survey: SurveyState;
  readonly surveyResponse: SurveyResponseState;
  readonly chatBot: ChatBotState;
  readonly results: ResultsState;
  readonly header: HeaderState;
  readonly dbTool: DbToolState;
  readonly newsPost: NewsPostState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  survey,
  surveyResponse,
  chatBot,
  results,
  header,
  dbTool,
  newsPost,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
