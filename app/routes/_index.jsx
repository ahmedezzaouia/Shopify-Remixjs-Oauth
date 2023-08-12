import React from "react";
import { json } from "@remix-run/node";
import {authenticate} from '../shopify.server'
import { AppProvider , CalloutCard, ButtonGroup, Button } from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { Link, useLoaderData } from "@remix-run/react";


export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export async function loader({request}) {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
      console.log("🚀🚀🚀 ~ file: _index.jsx From Shopify Server")
      const admin= await authenticate.admin(request);
      console.log("🚀 ~ file: _index.jsx ", admin)
      
  }
  else{
    console.log("🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 you are From browser")
  }
 
  return json({
    polarisTranslations: require("@shopify/polaris/locales/en.json"),
  });
}


export default function Index() {
  const {polarisTranslations } = useLoaderData();

  async function openProductSlector() {
    const selected = await shopify.resourcePicker({type: 'product'});
    console.log(selected);
  }

  return (
    <AppProvider 
      i18n={polarisTranslations}
      linkComponent={RemixPolarisLink}
    >
      <CalloutCard
            title="Customize the style of your checkout"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Customize checkout',
              url: '#',
            }}
          >
            <p>Upload your store’s logo, change colors and fonts, and more.</p>
            <ButtonGroup>
              <Button>Cancel</Button>
              <Button primary onClick = {openProductSlector}>Select Product 2</Button>
          </ButtonGroup>
      </CalloutCard>
    </AppProvider>
  );
}

const RemixPolarisLink = React.forwardRef(( props, ref) => (
  <Link {...props} to={props.url ?? props.to} ref={ref}>
    {props.children}
  </Link>
));
