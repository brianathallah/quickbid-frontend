import { Layout, Card, Col, Row, Tag, Button } from "antd";
import "antd/dist/antd.css";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productMock, userMock, UserTypeSeller } from "../../utils/const";
import { fetcher } from "../../utils/fetcher";
import { getProductBid, getProductList } from "./fetcher";
import HeaderQuickBid from "../../components/Header";
// import { getStorageValue } from "../../utils/helpers";

const { Content, Footer } = Layout;
const { Meta } = Card;

function LandingPage() {
  const [user, setUser] = useState({});
  const [productList, setProductList] = useState([]);

  const getBidData = useCallback((productId) => {
    const params = { product_id: productId };
    getProductBid({ fetcher, params }).then((res) => {
      if (res && res.data && res.data.length > 0) {
        const productBidData = res.data;
        return productBidData;
      }
      return 0;
    });
  }, []);

  const getData = useCallback(() => {
    const params = {};
    getProductList({ fetcher, params }).then((res) => {
      if (res && res.data && res.data.length > 0) {
        const productData = res.data;
        setProductList(productData);
        getBidData(productData.id);
      }
    });
  }, [getBidData]);

  useEffect(() => {
    setUser(userMock);
    setProductList([{ ...productMock, bid_highest: 1000000000 }]);
  }, [getData]);

  const cardMock = (
    <Link to="/product/detail">
      <Card
        style={{ margin: "20px 0" }}
        hoverable
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta title="Mobil Ferrari" />
        <div style={{ margin: "10px 0" }}>
          <b>40.000 GPC</b> Highest
        </div>
        <Tag icon={<ExclamationCircleOutlined />} color="error">
          3 hour left
        </Tag>
      </Card>
    </Link>
  );

  return (
    <Layout className="layout">
      <HeaderQuickBid user={user} />
      <Content style={{ margin: "50px 100px" }}>
        {user.user_type === UserTypeSeller && (
          <Link to="/product/add">
            <Button>Add Product</Button>
          </Link>
        )}
        <Row gutter={32}>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>
          <Col span={4}>{cardMock}</Col>

          {productList.map((product, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col span={4} key={i}>
              <Link to="/product/detail">
                <Card
                  style={{ margin: "20px 0" }}
                  hoverable
                  cover={<img alt="example" src={product.image_url} />}
                >
                  <Meta title={product.name} />
                  <div style={{ margin: "10px 0" }}>
                    <b>{product.bid_highest} GPC</b> Highest
                  </div>
                  <Tag icon={<ExclamationCircleOutlined />} color="error">
                    {product.end_time}
                  </Tag>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        QuickBid ©2022 Created by{" "}
      </Footer>
    </Layout>
  );
}

export default LandingPage;
