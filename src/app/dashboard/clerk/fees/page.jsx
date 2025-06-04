import React from "react";
import PendingFeeList from "../components/PendingFeeList";
import RecentPayments from "../components/RecentPayments";
import AddPaymentForm from "../components/AddPaymentForm";
import RecentTransactions from "../components/RecentTransactions";

function page() {
  return (
    <div>
      <AddPaymentForm />
      <RecentPayments />
      <PendingFeeList />
      <RecentTransactions />
    </div>
  );
}

export default page;
