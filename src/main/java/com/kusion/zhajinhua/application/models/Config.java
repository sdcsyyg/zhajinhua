package com.kusion.zhajinhua.application.models;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.kusion.zhajinhua.common.models.AbstractModel;

@Entity
@Table
public class Config extends AbstractModel {

    private static final long serialVersionUID = 7153070657398909789L;

    private String section;

    private String name;

    private String value;

    private String note;

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}