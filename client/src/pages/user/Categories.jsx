import React, { useState, useEffect, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";

import HeaderPage from "../../components/user/HeaderPage/HeaderPage.jsx";
import Card from "../../components/public/Card.jsx";
import Pagination from "../../components/public/Pagination.jsx";
import { AuthContext } from "../../helpers/AuthContext.jsx";

import newRequest from "../../utils/newRequest.js";

const Categories = () => {

  const {currentUser} = useContext(AuthContext)

  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");

if(currentUser && currentUser?.Vai_tro !== "NguoiDung"){
  useEffect(() => {
    newRequest.get(`/document?keyword=${keyword}&page=${page}&limit=${limit}`).then((res) => {
      if (res.data.error) {
        // alert(res.data.error);
      } else {
        setList(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
      }
    });
  }, [page, limit, keyword]);
}
else{
  useEffect(() => {
    newRequest.get(`/document/notuser?keyword=${keyword}&page=${page}&limit=${limit}`).then((res) => {
      if (res.data.error) {
        // alert(res.data.error);
      } else {
        setList(res.data.result);
        setPage(res.data.page);
        setPages(res.data.totalPage);
        setRows(res.data.totalRows);
      }
    });
  }, [page, limit, keyword]);
}
 

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  // if (data) return <LoadingCompoment />;
  // if (error) return <ErrorCompoment />;

  return (
    <>
      <HeaderPage page={"Danh sách tài liệu"} linkpage={"Danh sách tài liệu"} />
      <div className="categories">
        <div className="rbt-page-banner-wrapper">
          <div className="rbt-banner-content">
            <div className="rbt-course-top-wrapper">
              <div className="container">
                <div className="row g-5 align-items-center">
                  <div className="col-lg-5 col-md-12">
                    <div className="rbt-sorting-list d-flex flex-wrap align-items-center">
                      <div className="rbt-short-item">
                        <span className="course-index fs-4">
                          Thứ tự {(page + 1) * limit - limit + 1} đến{" "}
                          {(page + 1) * limit > rows ? rows : (page + 1) * limit} của {rows} kết quả
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-12">
                    <div className="rbt-sorting-list d-flex flex-wrap align-items-center justify-content-start justify-content-lg-end">
                      <div className="rbt-short-item">
                        <form action="#" className="rbt-search-style me-0">
                          <input
                            type="text"
                            placeholder="Tìm kiếm tài liệu..."
                            onChange={(e) => {
                              setKeyword(e.target.value);
                            }}
                          />
                          <button type="submit" className="rbt-search-btn rbt-round-btn">
                            <SearchIcon />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rbt-section-overlayping-top rbt-section-gapBottom">
          <div className="container">
            {list.length === 0 ? (
              <h2 className="no_data_search">Không tìm thấy kết quả bạn cần</h2>
            ) : (
              <>
                <div className="rbt-course-grid-column list-column-half active-list-view">
                  {list.map((i) => (
                    <div
                      key={i.id}
                      className="course-grid-4"
                      data-sal-delay="150"
                      data-sal="slide-up"
                      data-sal-duration="800"
                    >
                      <Card item={i} />
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  <Pagination
                    even
                    limit={limit}
                    setLimit={setLimit}
                    setPage={setPage}
                    changePage={changePage}
                    pages={pages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
