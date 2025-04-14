import { Fragment } from "react";
import Activity from "./activity";

export default async function ActivityPage() {
  return (
    <Fragment>
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900">
        Activity
      </h1>
      <Activity />
    </Fragment>
  )
}
