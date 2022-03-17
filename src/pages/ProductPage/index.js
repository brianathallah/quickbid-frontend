import { Layout, Col, Row, Button, Form, Input, PageHeader } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  bidMock,
  productMock,
  userMock,
  UserTypeBuyer,
} from "../../utils/const";
import { fetcher } from "../../utils/fetcher";
import {
  getProductDetail,
  postBidValue,
  getProductHighestBid,
} from "./fetcher";
import HeaderQuickBid from "../../components/Header";

const { Content, Footer } = Layout;

function ProductPage() {
  const [user, setUser] = useState({});
  const [product, setProduct] = useState({});
  const [productHighestBid, setProductHighestBid] = useState({});
  const [searchParams] = useSearchParams();

  const getBidData = useCallback((productId) => {
    const params = { product_id: productId };
    getProductHighestBid({ fetcher, params }).then((res) => {
      if (res && res.data && res.data.length > 0) {
        const productBidData = res.data;
        setProductHighestBid(productBidData);
      }
    });
  }, []);

  useEffect(() => {
    setUser(userMock);
    setProduct(productMock);
    setProductHighestBid(bidMock);
    const productId = searchParams.get("product_id");
    const params = { product_id: productId };
    getProductDetail({ fetcher, params }).then((res) => {
      if (res && res.data && res.data.length > 0) {
        const productData = res.data;
        setProduct(productData);
        getBidData(productData.id);
      }
    });
  }, [getBidData, searchParams]);

  const handleFinishForm = useCallback(
    async (val) => {
      const data = {
        user_id: user.user_id,
        bid_value: val.bid_value,
        timestamp: moment().unix(),
      };

      await postBidValue({ fetcher, data }).then((result) => {
        if (result.STATUS === "ERROR") return "Error";
        return true;
      });
    },
    [user]
  );
  return (
    <Layout className="layout">
      <HeaderQuickBid user={user} />
      <PageHeader
        title={product.name}
        subTitle={product.seller_name}
        style={{ margin: "0px 100px" }}
      />
      <Content style={{ margin: "0px 100px" }}>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <img src={product.image_url} alt="product_image" width={400} />
          </Col>
          <Col span={12}>
            Highest Bidder
            <br />
            <b>{productHighestBid.user_name}</b>
            <br />
            {productHighestBid.value} GoPay Coins
            <br />
            <br />
            {user.user_type === UserTypeBuyer && (
              <Form
                name="basic"
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={handleFinishForm}
                autoComplete="off"
              >
                <Form.Item label="Your Bid" name="bid_value">
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        QuickBid ©2022 Created by{" "}
      </Footer>
    </Layout>
  );
}

export default ProductPage;
