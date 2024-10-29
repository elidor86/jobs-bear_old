import React, {useState, useEffect} from "react";
import styles from "./Tags.module.css";
import logEvent from "../../lib/logEvent";

const Tags = (props) => {

    const [tags, setTags] = useState([
        "delivery driver",
        "work from home",
        "amazon",
        "supermarket",
        "temp",
        "Other"
    ]);

    useEffect(() => {
        try {
            let tmpStrTags = localStorage.getItem("keywords");
            if (tmpStrTags) {
                let localTags = JSON.parse(tmpStrTags).filter((tag) => {
                    tag = tag.toLowerCase();
                    return tags.indexOf(tag) === -1 && tags.length <= 8;
                });
                localTags = localTags.splice(0, 5);
                setTags([...localTags, ...tags]);
            }
        } catch (e) {
            // Handle any errors in a suitable way
        }
    }, []);

    const onTagClick = (tag) => {
        if (tag.search(/other/igm) > -1) {
            props.app.OpenModalSearch("pageTitle");
        } else {
            props.app.setKeyword(tag);
            props.tagClick(tag);
        }

        logEvent("TagClick", {tag});
    };

    const getTagsHtml = () => {
        return tags.map((tag) => (
            <span onClick={() => onTagClick(tag)} key={tag} className={styles.tag}>
                {tag}
            </span>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.text1}>
                {props.text ? props.text : "Broaden your search"}
            </div>
            <div className={styles.tagContainer}>
                {getTagsHtml()}
            </div>
        </div>
    );
};

export default Tags;
