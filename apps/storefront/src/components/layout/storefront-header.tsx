import { HeaderNavigation } from "@/components/layout/header-navigation";
import { primaryNavigation, utilityNavigation } from "@/config/navigation";
import { searchPreviewContent } from "@/config/search-preview";
import { storeConfig } from "@/config/store";

export function StorefrontHeader() {
  return (
    <HeaderNavigation
      storeName={storeConfig.name}
      logoUrl={storeConfig.branding.logoUrl}
      items={primaryNavigation}
      utilityLinks={utilityNavigation}
      searchContent={searchPreviewContent}
      cartCount={0}
    />
  );
}
