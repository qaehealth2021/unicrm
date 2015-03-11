/**
 * 
 */
package com.sail.cot.filter;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.util.HashMap;
import java.util.Map;

import org.directwebremoting.convert.BeanConverter;
import org.directwebremoting.extend.MarshallException;
import org.directwebremoting.impl.PropertyDescriptorProperty;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Nov 26, 2011 3:37:41 PM </p>
 * <p>Class Name: DwrPropertyFilter.java </p>
 * @author achui
 *
 */
public class DwrPropertyFilter extends BeanConverter {

	@Override
    public Map getPropertyMapFromClass(Class type, boolean readRequired, boolean writeRequired) throws MarshallException
    {
        try
        {
            BeanInfo info = Introspector.getBeanInfo(type);
            PropertyDescriptor[] descriptors = info.getPropertyDescriptors();

            Map properties = new HashMap();
            for (int i = 0; i < descriptors.length; i++)
            {
                PropertyDescriptor descriptor = descriptors[i];
                String name = descriptor.getName();

                // We don't marshall getClass()
                if (name.equals("class"))
                {
                    continue;
                }
                //在hibernate中含有一对多关系的set集合过滤掉
                if(descriptor.getPropertyType().getSimpleName().equals("Set")){
                	continue;
                }
                	
                // Access rules mean we might not want to do this one
                if (!isAllowedByIncludeExcludeRules(name))
                {
                    continue;
                }

                if (readRequired && descriptor.getReadMethod() == null)
                {
                    continue;
                }

                if (writeRequired && descriptor.getWriteMethod() == null)
                {
                    continue;
                }

                properties.put(name, new PropertyDescriptorProperty(descriptor));
            }

            return properties;
        }
        catch (IntrospectionException ex)
        {
            throw new MarshallException(type, ex);
        }
    }

}
