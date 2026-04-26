type RequestFormCheckInput = {
  contactPerson: string;
  phoneNumber: string;
  emailAddress: string;
  dateFrom: string;
  dateTo: string;
  peopleCount: string;
  locationCity: string;
  budget: string;
};

export function isRequestFormSubmittable(values: RequestFormCheckInput) {
  const hasPhoneNumber = values.phoneNumber.trim().length > 0;
  const hasEmailAddress = values.emailAddress.trim().length > 0;

  if (!values.contactPerson.trim()) {
    return false;
  }

  if (!hasPhoneNumber && !hasEmailAddress) {
    return false;
  }

  if (!values.locationCity.trim()) {
    return false;
  }

  if (!values.dateFrom || !values.dateTo) {
    return false;
  }

  if (new Date(values.dateTo) < new Date(values.dateFrom)) {
    return false;
  }

  if (!values.peopleCount.trim() || Number(values.peopleCount) <= 0) {
    return false;
  }

  if (!values.budget.trim() || Number(values.budget) < 0) {
    return false;
  }

  return true;
}
