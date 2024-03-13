import AbstractView from '../framework/view/abstract-view';
import { PROFILE_RATING } from '../consts';

const createProfileTemplate = (alreadyWatching) => {
  const profileRating = PROFILE_RATING.findLast((element) => alreadyWatching >= element.lowerLimit);

  return `
    <section class="header__profile profile">
      <p class="profile__rating">${profileRating.name}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
};

export default class ProfileView extends AbstractView {
  #alreadyWatching = null;

  constructor(alreadyWatching) {
    super();
    this.#alreadyWatching = alreadyWatching;
  }

  get template() {
    return createProfileTemplate(this.#alreadyWatching);
  }
}
