define(["./Matrix2-7fbd2afb","./defaultValue-81eec7ed","./EllipseOutlineGeometry-77657309","./RuntimeError-8952249c","./ComponentDatatype-be80d12c","./WebGLConstants-508b9636","./GeometryOffsetAttribute-8c5e10db","./Transforms-1ddad957","./_commonjsHelpers-3aae1032-26891ab7","./combine-3c023bda","./EllipseGeometryLibrary-39f7f2df","./GeometryAttribute-a2b3de2c","./GeometryAttributes-32b29525","./IndexDatatype-a852edb7"],(function(e,t,r,i,n,o,a,l,d,s,c,b,u,m){"use strict";return function(i,n){return t.defined(n)&&(i=r.EllipseOutlineGeometry.unpack(i,n)),i._center=e.Cartesian3.clone(i._center),i._ellipsoid=e.Ellipsoid.clone(i._ellipsoid),r.EllipseOutlineGeometry.createGeometry(i)}}));