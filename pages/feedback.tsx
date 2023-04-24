import HeaderComponent from "@/components/common/Header";
import { Fragment } from "react";
import { NextSeo  } from "next-seo";
export default function Feedback() {
  return (
    <Fragment>
       <NextSeo
        title = "피드백"
        description = "피드백 페이지입니다."
      />
      <HeaderComponent/>
      <main>

      </main>
    </Fragment>
  )
}
