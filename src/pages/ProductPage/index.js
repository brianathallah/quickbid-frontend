import { Layout, Menu, Col, Row, Button, Form, Input } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { UserTypeBuyer, UserTypeSeller } from "../../utils/const";
import { getStorageValue } from "../../utils/helpers";
import { fetcher } from "../../utils/fetcher";
import {
  getProductDetail,
  postBidValue,
  getProductHighestBid,
} from "./fetcher";

const { Header, Content, Footer } = Layout;

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
    const userData = getStorageValue("user", {
      user_id: 0,
      user_name: "",
      user_type: 0,
    });
    setUser(userData);
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
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1}>Home</Menu.Item>
          {user.user_type === UserTypeBuyer && (
            <Menu.Item key={2}>My Bid</Menu.Item>
          )}
          {user.user_type === UserTypeSeller && (
            <Menu.Item key={2}>My Listing</Menu.Item>
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "50px 300px" }}>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <img src={product.img_url} alt="product_image" />
          </Col>
          <Col span={8}>
            <div>{product.name}</div>
          </Col>
          <Col span={8}>
            Highest Bidder
            <br />
            {productHighestBid.user_name}
            <br />
            {productHighestBid.value} GoPay Coins
            <br />
            {user.user_type === UserTypeBuyer && (
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
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
