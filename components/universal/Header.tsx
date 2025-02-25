import { Link } from "next-view-transitions";
import Image from "next/image";
import { CategorySwitcher } from "../custom-components/CategorySwitcher";
import { FlexWrapper } from "../custom-components/FlexWrapper";
import { HeaderLeft } from "../custom-components/HeaderLeft";
import { AccountSwitcher } from "../custom-components/AccountSwitcher";
import { Suspense } from "react";
import {
  AccountSwitcherSkeleton,
  CategorySwitcherSkeleton,
  HeaderLeftSkeleton,
} from "../ui/Skeletons";
import { Responsive } from "@/components/custom-components/Responsive";

export const Header = async () => {
  // const user = session?.user;

  return (
    <FlexWrapper
      py={{ base: 5, md: 10, lg: 14 }}
      alignItems={"center"}
      justifyContent={"space-between"}
      width={{ base: "90%", md: "80%" }}
      mx={"auto"}
    >
      <FlexWrapper alignItems={"center"} gap={5}>
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            className={"flex-shrink-0"}
            width={150}
            height={50}
            alt="logo"
          />
        </Link>
        <Responsive hideBelow={"lg"}>
          <Suspense fallback={<CategorySwitcherSkeleton />}>
            <CategorySwitcher />
          </Suspense>
        </Responsive>
        <Responsive hideBelow={"lg"}>
          <Suspense fallback={<AccountSwitcherSkeleton />}>
            <AccountSwitcher />
          </Suspense>
        </Responsive>
      </FlexWrapper>

      <Suspense fallback={<HeaderLeftSkeleton />}>
        <HeaderLeft />
      </Suspense>
    </FlexWrapper>
  );
};
